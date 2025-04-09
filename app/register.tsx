import React from "react"
import { Link, Stack, useRouter } from "expo-router"
import ContainerView from "@/components/ContainerView"
import InputText from "@/components/ui/InputText"
import { AppStyle, spacingSize } from "@/constants/Styles"
import OpacityButton from "@/components/ui/OpacityButton"
import { ThemedText } from "@/components/ThemedText"
import { View } from "react-native"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import TopBarNavigator from "@/components/TopBarNavigator"

const RegisterScreen = () => {
    const theme = useColorScheme()

    return (
        <>
            <ContainerView
                center
                stickyHeaderComponent={<TopBarNavigator />}
                stickyFooterComponent={
                    <View
                        style={[
                            { padding: spacingSize, width: '100%' },
                            AppStyle.flexCenter,
                            AppStyle.flexRow,
                            AppStyle.justifyBetween,
                        ]}
                    >
                        <ThemedText>¿Ya tienes una cuenta?</ThemedText>
                        <Link href="/login" style={{ color: Colors[theme ?? 'light'].tint, textTransform: 'uppercase', fontWeight: '800' }}>Iniciar Sesión</Link>
                    </View>
                }
            >
                <View style={{ marginBottom: 20, marginTop: 20, ...AppStyle.flexCenter }}>
                    <ThemedText type="title">Crear nueva cuenta</ThemedText>
                    <ThemedText style={{ color: Colors[theme ?? 'light'].textLabel }}>Ingrese sus datos para crear una cuenta</ThemedText>
                </View>
                <View
                    style={{ marginTop: 20, marginBottom: 20, gap: 16, width: '100%' }}
                >
                    <InputText 
                        label="Nombres"
                        placeholder="Ingrese sus nombres y apellidos"
                    />
                    <InputText 
                        label="Correo electrónico"
                        placeholder="Ingrese su correo electrónico"
                    />
                    <InputText 
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        isPassword
                    />
                    <OpacityButton
                        style={{ marginTop: 20, }}
                        title="Registrarme"
                        color="primary"
                    />
                </View>
            </ContainerView>
        </>
    )
}

export default RegisterScreen