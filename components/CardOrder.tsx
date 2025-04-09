import { Colors } from "@/constants/Colors"
import { AppStyle, spacingSize } from "@/constants/Styles"
import { getColor, shadeColor } from "@/helpers/colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Order, PackageItem } from "@/types/Category"
import React from "react"
import { Platform, StyleProp, View, ViewStyle } from "react-native"
import OpacityButton from "./ui/OpacityButton"
import Dropdown from "./Dropdown"
import IconTypedComponent from "./ui/IconTyped"
import { ThemedText } from "./ThemedText"
import { openBrowserAsync } from "expo-web-browser"
import { Link } from "expo-router"

//Sheila_tai:avatar5680

type CardOrderProps = {
    item: Order,
    style?: StyleProp<ViewStyle>
}

const CardOrder: React.FC<CardOrderProps> = ({ item, style, }) => {
    const theme = useColorScheme()

    const onDownloadPdf = async(url?: string | null) => {
        if(url) {
            await openBrowserAsync(url);
        }
    }

    return (
        <View
            style={[
                {
                    backgroundColor: Colors[theme ?? 'light'].background,
                    marginHorizontal: spacingSize * 2,
                    marginVertical: spacingSize,
                    ...AppStyle.box,
                },
                Platform.OS === 'android' && AppStyle.shadow,
                Platform.OS === 'ios' && { borderWidth: 1, borderColor: Colors[theme ?? 'light'].borderColor },
                style
            ]}
        >
            <ThemedText type="defaultSemiBold" style={{ color: shadeColor(getColor('primary'), -10) }}>{ item.pq_titulo }</ThemedText>
            <ThemedText type="small" style={{ color: Colors[theme ?? 'light'].textLabel, fontWeight: '800' }}>{ item.pq_tipo_orden_nombre }</ThemedText>
            <View
                style={{
                    ...AppStyle.flexRow,
                    gap: spacingSize,
                }}
            >
                <ThemedText type="small" style={{ fontWeight: 'bold' }}>Estado</ThemedText>
                <ThemedText type="small" style={{ fontWeight: 'bold', color: getColor((item.cp_est?.toLowerCase() === 'no pagado') ? 'red' : 'green') }} >{ item.cp_est }</ThemedText>
            </View>
            <View
                style={{
                    ...AppStyle.flexRow,
                    gap: spacingSize,
                }}
            >
                <ThemedText type="small" style={{ fontWeight: 'bold' }}>Fecha</ThemedText>
                <ThemedText type="small">{ item.cp_fecha }</ThemedText>
            </View>
            <View
                style={{
                    ...AppStyle.flexRow,
                    gap: spacingSize,
                }}
            >
                <ThemedText type="small" style={{ fontWeight: 'bold' }}>A nombre de</ThemedText>
                <ThemedText type="small">{ item.anombre_de }</ThemedText>
            </View>
            <View
                style={{
                    ...AppStyle.flexRow,
                    ...AppStyle.justifyBetween,
                    marginTop: spacingSize,
                }}
            >
            {
                item.cp_est?.toLowerCase() === 'pagado' && (
                    <OpacityButton
                        style={{ width: '20%', height: 45 }}
                        color="red"
                        icon={<IconTypedComponent type="AntDesign" name="pdffile1" />}
                        onPress={() => onDownloadPdf(item?.url_orden)}
                    />
                )
            }
            {
                item?.url_paquetes && (
                    <Dropdown title="Paquetes">
                    {
                        item.url_paquetes.map((it: PackageItem, i: number) => {
                            return (
                                <View
                                    key={i}
                                    style={[
                                        {
                                            display: 'flex', flexDirection: 'row',
                                            justifyContent: 'space-between', alignItems: 'center',
                                            paddingHorizontal: 16,
                                            paddingVertical: 8,
                                            flexWrap: 'wrap',
                                            gap: 10,
                                        },
                                        (i < (item?.url_paquetes?.length ?? 0) - 1) && { borderBottomWidth: 1, borderBottomColor: shadeColor(Colors[theme ?? 'light'].borderColor, 8) }
                                    ]}
                                >
                                    <ThemedText style={{ display: 'flex', flexWrap: 'wrap' }}>{ it.titulo }</ThemedText>
                                    <Link
                                        key={i}
                                        href={it.url as any}
                                        style={{ backgroundColor: getColor('primary'), padding: 10, borderRadius: 100 }}
                                    >
                                        <IconTypedComponent type="Entypo" name="download" />
                                    </Link>
                                </View>
                            )
                        })
                    }
                    </Dropdown>
                )
            }
            </View>
        </View>
    )
}

export default CardOrder