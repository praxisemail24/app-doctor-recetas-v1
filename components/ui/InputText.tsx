import { AppStyle, spacingSize } from "@/constants/Styles"
import React, { useEffect, useState } from "react"
import { NativeSyntheticEvent, Platform, Text, TextInput, TextInputFocusEventData, TextInputProps, TouchableOpacity, useColorScheme, View } from "react-native"
import { Colors } from "@/constants/Colors"
import { ThemedView } from "../ThemedView"
import IconTypedComponent from "./IconTyped"

interface InputTextProps extends Omit<TextInputProps, 'placeholderTextColor' | 'secureTextEntry'> {
    label?: string,
    isPassword?: boolean,
}

const InputText: React.FC<InputTextProps> = ({ label, onFocus, onBlur, isPassword = false, ...props }) => {
    const theme = useColorScheme()
    const [focused, setFocused] = useState(false)
    const [secureTextEntryProxy, setSecureTextEntryProxy] = useState(isPassword)

    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true)
        onFocus?.(e)
    }

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false)
        onBlur?.(e)
    }

    const handleOnVisiblePwd = () => {
        setSecureTextEntryProxy(!secureTextEntryProxy)
    }

    useEffect(() => {
        setSecureTextEntryProxy(isPassword ?? false)
    }, [])

    return (
        <ThemedView
            style={[
                {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 16,
                    borderRadius: spacingSize,
                },
                Platform.OS === 'android' && AppStyle.shadow,
                Platform.OS === 'ios' && { borderWidth: 1, borderColor: Colors[theme ?? 'light'].borderColor },
            ]}
        >
            { label && (<Text
                style={[
                    { color: Colors[theme ?? 'light'].textLabel, fontSize: 13, fontFamily: 'Barlow' },
                    focused && { color: Colors[theme ?? 'light'].primaryColor, fontWeight: '700' },
                ]}
                >{ label }</Text>) }
            <View
                style={{  ...AppStyle.flexRow,  gap: 16 }}
            >
                <TextInput 
                    style={[
                        { color: Colors[theme ?? 'light'].text, fontWeight: '600', fontSize: 14, width: '87%', fontFamily: 'Barlow' },
                        Platform.OS === 'ios' && { paddingVertical: spacingSize }
                    ]}
                    placeholderTextColor={'#C8C9CA'}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    selectionColor={Colors[theme ?? 'light'].primaryColor}
                    secureTextEntry={secureTextEntryProxy}
                    {...props}
                />
                {
                    isPassword && (
                        <TouchableOpacity onPress={handleOnVisiblePwd}>
                            <IconTypedComponent type="Entypo" name={ secureTextEntryProxy ? 'eye' : 'eye-with-line' } color={ Colors[theme ?? 'light'].textLabel } size={26} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </ThemedView>
    )
}

export default InputText