import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import TopBarNavigator from "@/components/TopBarNavigator";
import IconTypedComponent from "@/components/ui/IconTyped";
import InputText from "@/components/ui/InputText";
import OpacityButton from "@/components/ui/OpacityButton";
import { Colors } from "@/constants/Colors";
import { AppStyle, spacingSize } from "@/constants/Styles";
import { http } from "@/helpers/http";
import { setAuth } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, useColorScheme, View } from "react-native";
import { Toast } from "toastify-react-native";

const LoginScreen = () => {
    const theme = useColorScheme()
    const dispatch = useAppDispatch()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleOnLogin = () => {
        setLoading(true)
        http.post(`/api/login`, {
            usuario: user,
            clave: password,
        }).then(({ data }) => {
            if(data.success) {
                dispatch(setAuth(data.data))
                setUser('')
                setPassword('')
                router.replace('/profile')
            } else {
                Toast.error(data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
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
                    <ThemedText>¿No tienes una cuenta?</ThemedText>
                    <Link href="/register" style={{ color: Colors[theme ?? 'light'].tint, textTransform: 'uppercase', fontWeight: '800' }}>Registrate</Link>
                </View>
            }
        >
            <View
                style={{
                    gap: 16,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 20, marginTop: 30, ...AppStyle.flexCenter }}>
                    <Image 
                        source={require('@/assets/images/logodr.png')}
                        style={{ height: 65, width: 260 }}
                    />
                </View>
                <View
                    style={{ marginTop: 20, marginBottom: 20, gap: 16, flex: 1 }}
                >
                    <InputText 
                        label="Usuario"
                        placeholder="Ingrese su usuario"
                        onChangeText={(v) => setUser(v)}
                    />
                    <InputText 
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        isPassword
                        onChangeText={(v) => setPassword(v)}
                    />
                    <OpacityButton 
                        title="Iniciar Sesión"
                        color="primary"
                        icon={ <IconTypedComponent type="Octicons" name="sign-in" /> }
                        style={{ marginTop: 20 }}
                        loading={loading}
                        onPress={handleOnLogin}
                    />
                </View>
            </View>
        </ContainerView>
    )
}

export default LoginScreen;