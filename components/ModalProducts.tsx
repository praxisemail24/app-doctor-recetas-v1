import { Category } from "@/types/Category"
import React, { useCallback, useEffect, useState } from "react"
import Modal from "react-native-modal"
import { ThemedView } from "./ThemedView"
import { useThemeColor } from "@/hooks/useThemeColor"
import { useAppDispatch } from "@/redux/store"
import { DOMAIN_URL, http } from "@/helpers/http"
import { Product } from "@/types/Product"
import { addItem } from "@/redux/slices/shoppingCartSlice"
import { fixUTF8, randomStr, toFixedNumber, truncateText } from "@/helpers/helpers"
import { Dimensions, FlatList, Platform, View } from "react-native"
import { AppStyle, spacingSize } from "@/constants/Styles"
import Card from "./ui/Card"
import { Image } from "react-native"
import { ThemedText } from "./ThemedText"
import { shadeColor } from "@/helpers/colors"
import { Toast } from "toastify-react-native"

const { height, width } = Dimensions.get('window')

export type ModalProductsProps = {
    category?: Category,
    isActive: boolean,
    onDismiss?: () => void,
}

const ModalProducts: React.FC<ModalProductsProps> = ({isActive, category, onDismiss}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const colorTitle = useThemeColor({}, 'primaryColor')
    const borderColor = useThemeColor({}, 'borderColor')
    const dispatch = useAppDispatch()

    const getProducts = useCallback(() => {
        setLoading(true)
        http.get(`https://${DOMAIN_URL}/api/get_productos.php?pq_tag=${category?.Tag}`)
            .then(({ data }) => {
                if(Array.isArray(data)) {
                    setProducts(data)
                }
            }).finally(() => setLoading(false))
    }, [category?.Tag])

    const onPressItem = (item: Product) => {
        try {
            dispatch(addItem({
                id: randomStr(),
                description: item.pq_titulo ?? '',
                price: item.pq_precio ?? 0,
                pq_id: item.pq_id,
                quantity: 1,
                data: item,
            }))
    
            Toast.info(`Se ha agregado correctamente el paquete al carrito.`)
    
            onDismiss?.()
        } catch(e: unknown) {
            if(e instanceof Error) {
                Toast.error(e.message)
            }
        }
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return (
        <Modal
            isVisible={isActive}
            onDismiss={onDismiss}
            onBackdropPress={onDismiss}
            backdropOpacity={0.5}
            style={{ margin: 0 }}
            swipeDirection={"down"}
            propagateSwipe
            onSwipeComplete={onDismiss}
        >
            <ThemedView style={{height: height / 1.3, width, position: 'absolute', bottom: 0}}>
                <ThemedView style={[
                    AppStyle.titleContainer, AppStyle.flexCenter,
                    Platform.OS === 'android' && AppStyle.shadow,
                    { paddingTop: spacingSize, paddingBottom: spacingSize, borderBottomColor: borderColor, borderBottomWidth: 1 },
                ]}
                >
                    <ThemedText type="subtitle" style={{ color: shadeColor(colorTitle, -20) }}>{ category?.Nombre }</ThemedText>
                </ThemedView>
                <FlatList 
                    data={products}
                    keyExtractor={(item) => `${item.pq_id}`}
                    refreshing={loading}
                    onRefresh={() => getProducts()}
                    style={[AppStyle.flatList]}
                    contentContainerStyle={{ paddingBottom: spacingSize * 2 }}
                    renderItem={({ item }) => {
                        return (
                            <Card 
                                style={[
                                    AppStyle.flexRow, AppStyle.flexCenter,
                                    { gap: spacingSize * 2, margin: spacingSize, }
                                ]}
                                onPress={() => onPressItem(item)}
                            >
                                <Image
                                    source={{ uri: item.pq_img }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                                <View style={[AppStyle.flexCol, { width: '70%' }]}>
                                    <ThemedText type="defaultSemiBold" style={{ color: colorTitle, fontWeight: 700 }}>{ truncateText(item.pq_titulo, 85) }</ThemedText>
                                    <ThemedText type="defaultSemiBold">{ fixUTF8(item.pq_tipo_orden_nombre) }</ThemedText>
                                    { item.pq_lead && <ThemedText type="medium">{ fixUTF8(item.pq_lead) }</ThemedText> }
                                    <View style={AppStyle.flexRow}>
                                        <ThemedText type="defaultSemiBold" style={{ fontWeight: 700 }}>Precio: </ThemedText>
                                        <ThemedText type="defaultSemiBold" style={{ color: colorTitle, fontWeight: 700 }}>${ toFixedNumber(item.pq_precio) }</ThemedText>
                                    </View>
                                </View>
                            </Card>
                        )
                    }}
                />
            </ThemedView>
        </Modal>
    )
} 

export default ModalProducts