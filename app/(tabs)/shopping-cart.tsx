import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Card from '@/components/ui/Card'
import { AppStyle, spacingSize } from '@/constants/Styles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { clearCart, removeItem } from '@/redux/slices/shoppingCartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Entypo, Fontisto } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import BoxButton from '@/components/ui/BoxButton'
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import { toFixedNumber } from '@/helpers/helpers'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import Constants from 'expo-constants'
import EmptyList from '@/components/EmptyList'

const { height, width } = Dimensions.get('window')

const ShoppingCartScreen = () => {
    const dispatch = useAppDispatch()
    const colorScheme = useColorScheme()
    const successColor = Colors[colorScheme ?? 'light'].successColor
    const dangerColor = Colors[colorScheme ?? 'light'].dangerColor
    const borderColor = Colors[colorScheme ?? 'light'].borderColor
    const backgroundColor = Colors[colorScheme ?? 'light'].background
    const items = useAppSelector(x => x.shoppingCart.items)
    const bottom = useBottomTabOverflow()

    const onDeleteItem = (id: string, index: number) => {
        dispatch(removeItem(id))
    }

    return (
        <ThemedView>
            <Animated.ScrollView
                scrollEventThrottle={16}
                scrollIndicatorInsets={{ bottom }}
                contentContainerStyle={{ paddingBottom: bottom, display: 'flex', flexDirection: 'column' }}
                style={{ gap: 16 }}
                stickyHeaderIndices={[0]}
            >
            <ThemedView
                style={{ 
                    backgroundColor,
                    borderBottomColor: borderColor,
                    borderBottomWidth: 1,
                    paddingTop: Constants.statusBarHeight + spacingSize,
                    paddingLeft: spacingSize,
                    paddingRight: spacingSize,
                    paddingBottom: spacingSize,
                }}
            >
                <ThemedText type="subtitle">Tu Carrito</ThemedText>
            </ThemedView>  
            <ThemedView style={{ flex: 1, minHeight: height * 0.875, alignItems: 'center' }}>
            {
                items.length == 0 && (
                    <EmptyList />
                )
            }
            {
                items.length > 0 && items.map((item, index) => (
                    <Animated.View 
                        style={{ paddingLeft: spacingSize, paddingRight: spacingSize, zIndex: index }}
                        entering={SlideInLeft.duration(200)}
                        exiting={SlideOutRight.duration(300)}
                        key={item.id}    
                    >
                        <Card
                            style={[
                                AppStyle.flexRow,
                                { gap: spacingSize, justifyContent: 'flex-start', margin: spacingSize }
                            ]}
                        >
                            <View
                                style={[
                                    AppStyle.flexCol,
                                    { justifyContent: 'flex-start', width: '92%' }
                                ]}
                            >
                                <ThemedText style={{ width: '92%' }}>{ item.description }</ThemedText>
                                <View style={[AppStyle.flexRow, { gap: spacingSize, width: '92%' }]}>
                                    <ThemedText type="defaultSemiBold">Precio:</ThemedText>
                                    <ThemedText style={{ color: successColor }}>${ toFixedNumber(item.price) }</ThemedText>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{ padding: 6, backgroundColor: dangerColor, borderRadius: '20%', }}
                                onPress={() => onDeleteItem(item.id, index)}
                            >
                                <Fontisto name="close-a" size={10} color={"#ffffff"} />
                            </TouchableOpacity>
                        </Card>
                    </Animated.View>
                ))
            }
            {
                items.length > 0 && (<BoxButton
                        style={{ 
                            ...AppStyle.flexCenter, 
                            ...AppStyle.flexRow,
                            borderColor: dangerColor,
                            padding: spacingSize,
                            borderRadius: spacingSize * 2,
                            margin: spacingSize,
                            width: width / 2.5,
                            gap: spacingSize,
                        }}
                        onPress={() => dispatch(clearCart())}
                    >
                        <Entypo name="trash" size={16} color={dangerColor} />
                        <ThemedText type="small" style={{ color: dangerColor, fontWeight: 'bold', textTransform: 'uppercase' }}>Limpiar</ThemedText>
                    </BoxButton>)
            }
            </ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    )
}

export default ShoppingCartScreen