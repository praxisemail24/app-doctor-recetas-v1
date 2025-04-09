import React from "react"
import { Platform, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { AppStyle } from "@/constants/Styles"
import { useThemeColor } from "@/hooks/useThemeColor"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export type CardProps = Omit<TouchableOpacityProps, "activeOpacity"> & {
    lightColor?: string,
    darkColor?: string,
    shadow?: Boolean,
}

const Card: React.FC<CardProps> = ({ style, children, lightColor, darkColor, onPress, shadow = true, ...props }) => {
    const theme = useColorScheme()

    return (
        <TouchableOpacity 
            style={[
                AppStyle.box, { borderWidth: 1, backgroundColor: Colors[theme ?? 'light'].background },
                (shadow && Platform.OS === 'android') && AppStyle.shadow,
                style
            ]}
            activeOpacity={onPress ? 0.5 : 1}
            onPress={onPress}
            {...props}
        >
        { children }
        </TouchableOpacity>
    )
}

export default Card