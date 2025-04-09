import React from "react";
import { ThemedText } from "@/components/ThemedText"
import IconTypedComponent from "@/components/ui/IconTyped";
import OpacityButton from "@/components/ui/OpacityButton"
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Link, useRouter } from "expo-router";
import { Dimensions, useColorScheme, View } from "react-native"
import Card from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import ContainerView from "@/components/ContainerView";
import TopBarNavigator from "@/components/TopBarNavigator";
import LottieView from "lottie-react-native";
import { Image } from "react-native";
import { AppStyle, spacingSize } from "@/constants/Styles";

const { width } = Dimensions.get('window')

const ProfileScreen = () => {
    const theme = useColorScheme()
    const signIn = useAppSelector(x => x.auth.signIn);
    const user = useAppSelector(x => x.auth.user);
    const router = useRouter();

    return (
        <ContainerView
            center={signIn === false}
            stickyHeaderComponent={<TopBarNavigator back={false} />}
            stickyFooterComponent={ 
                !signIn &&  (
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
                )
            }
        >
            {
                !signIn && (
                    <View
                        style={{
                            width: '100%',
                            gap: 16,
                        }}
                    >
                        <LottieView 
                            source={require('@/assets/animations/doctor.json')}
                            autoPlay
                            style={{ width: width * 0.8, height: width * 0.8 }}
                        />
                        <ThemedText type="subtitle" center>¡Conéctate para descubrir nuevos paquetes y seguir el estado de tus compras!</ThemedText>
                        <ThemedText>Accede a promociones exclusivas, guarda tu historial y recibe notificaciones sobre tus pedidos en tiempo real.</ThemedText>
                        <OpacityButton
                            title="Iniciar Sesión"
                            color="primary"
                            icon={<IconTypedComponent type="Octicons" name="sign-in" color="white" />}
                            href={"login" as any}
                        ></OpacityButton>
                    </View>
                )
            }
            {
                signIn && (
                    <View
                        style={{  gap: 16, width: '100%' }}
                    >
                        <Image
                            source={require('@/assets/images/bg/micuenta.png')}
                            style={{ height: 160, objectFit: 'scale-down' }}
                        />
                        <View>
                            <ThemedText type="subtitle" style={{ fontWeight: 'normal' }}>Bienvenido(a)</ThemedText>
                            <ThemedText type="subtitle">{ user?.us_nombres }</ThemedText>
                        </View>
                        <Card
                            
                        >
                            <ThemedText>Mi perfil</ThemedText>
                        </Card>
                        <Card
                            onPress={() => router.navigate('/orders')}
                        >
                            <ThemedText>Mis ordenes</ThemedText>
                        </Card>
                    </View>
                )
            }
        </ContainerView>
    )
}

export default ProfileScreen