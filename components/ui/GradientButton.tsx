import { shadeColor } from "@/helpers/colors";
import { LinearGradient } from "expo-linear-gradient"
import { View, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { ThemedText } from "../ThemedText";
import React from "react";

export type GradientButtonProps = TouchableOpacityProps & {
    color: string,
    label?: string,
}

const GradientButton: React.FC<GradientButtonProps> = ({ color, label, children, style, ...props }) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            {...props}
        >
            <LinearGradient
                colors={[color, shadeColor(color, -20)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <View style={styles.overlay}>
                    { children }
                </View>
            </LinearGradient>
            { label && <ThemedText style={styles.text}>{label}</ThemedText>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //justifyContent: 'center'
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(255, 255, 255, 0.35)",
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "600",
        color: "#4F4F4F",
    },
})

export default GradientButton