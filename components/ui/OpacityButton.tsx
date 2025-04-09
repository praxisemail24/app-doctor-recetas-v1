import { spacingSize } from "@/constants/Styles"
import { getColor, shadeColor } from "@/helpers/colors"
import { ColorTheme } from "@/types/Theme"
import { ExternalPathString, RelativePathString, useRouter } from "expo-router"
import React from "react"
import { GestureResponderEvent, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import IconLoading from "../IconLoading"

export interface OpacityButtonProps extends Omit<TouchableOpacityProps, 'activeOpacity' | 'children'> {
    title?: string,
    color?: ColorTheme,
    light?: string,
    dark?: string,
    href?: RelativePathString | ExternalPathString,
    icon?: React.ReactNode | React.ReactElement,
    center?: boolean,
    loading?: boolean,
}

const OpacityButton: React.FC<OpacityButtonProps> = ({ title, icon, color, light, dark, href, center = true, onPress, style, loading, ...props }) => {
    const backgroundColor = getColor(color ?? 'primary')
    const router = useRouter()

    const handleOnPress = (e: GestureResponderEvent) => {
        if(onPress === undefined && href !== undefined) {
            router.navigate(href)
        }

        if(href === undefined && onPress !== undefined) {
            onPress?.(e)
        }
    }

    return (
        <TouchableOpacity
            style={[
                {
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    gap: spacingSize,
                    backgroundColor,
                    paddingTop: spacingSize,
                    paddingBottom: spacingSize,
                    paddingLeft: spacingSize * 2,
                    paddingRight: spacingSize * 2,
                    borderRadius: spacingSize,
                    borderColor: shadeColor(backgroundColor, -5),
                    borderWidth: 1,
                    shadowColor: '#222222',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 6,
                },
                center && { justifyContent: 'center' },
                style,
            ]}
            activeOpacity={0.6}
            onPress={handleOnPress}
            {...props}
        >
            { (icon && !loading) && icon }
            { 
                loading && (
                    <IconLoading />
                ) 
            }
            { title && (
                    <Text
                        style={{
                            fontSize: 16,
                            textTransform: 'uppercase',
                            color: ['white'].includes(color ?? 'primary') ? '#49494D' : '#ffffff'
                        }}
                    >{ title }</Text>
                ) 
            }
        </TouchableOpacity>
    )
}

export default OpacityButton