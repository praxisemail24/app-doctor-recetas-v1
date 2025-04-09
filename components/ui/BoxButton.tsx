import { AppStyle } from "@/constants/Styles";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

const BoxButton: React.FC<TouchableOpacityProps> = ({ style, children, ...props }) => {
    return (
        <TouchableOpacity
            style={[AppStyle.box, style]}
            activeOpacity={0.3}
            {...props}
        >
        { children }
        </TouchableOpacity>
    )
}

export default BoxButton;