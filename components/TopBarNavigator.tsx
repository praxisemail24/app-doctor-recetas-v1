import { StyleSheet, TouchableOpacity, View } from "react-native"
import IconTypedComponent from "./ui/IconTyped"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Colors } from "@/constants/Colors"
import Constants from "expo-constants"
import { spacingSize } from "@/constants/Styles"
import { useRouter } from "expo-router"
import { getColor } from "@/helpers/colors"
import React from "react"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { logout } from "@/redux/slices/authSlice"

interface TopBarNavigatorProps {
    to?: string,
    back?: boolean,
    logOut?: boolean,
}

const TopBarNavigator: React.FC<TopBarNavigatorProps> = ({ to, back = true, logOut = true }) => {
    const theme = useColorScheme()
    const router = useRouter()
    const signIn = useAppSelector(x => x.auth.signIn)
    const dispatch = useAppDispatch()

    const onBack = () => {
        if(to) {
            router.navigate(to as any)
        } else {
            router.back()
        }
    }
    const onLogout = () => dispatch(logout())

    return (
        <View
            style={[
                {
                    paddingTop: Constants.statusBarHeight + spacingSize,
                    paddingBottom: spacingSize,
                    ...Styles.container,
                },
                ((!back && signIn) && logOut) && { flexDirection: 'row-reverse' }
            ]}
        >
        {
            back && (
                <TouchableOpacity
                    style={{ 
                        ...Styles.button,
                        backgroundColor: (theme === 'light') ? '#fff' : '#000',
                    }}
                    onPress={onBack}
                >
                    <IconTypedComponent 
                        type="Entypo"
                        name="chevron-left"
                        size={20}
                        color={ theme === 'light' ? '#222' : '#fff' }
                    />
                </TouchableOpacity>
            )
        }
        {
            (signIn && logOut) && (
                <TouchableOpacity
                    style={{
                        ...Styles.button,
                        shadowColor: Colors[theme ?? 'light'].borderColor,
                    }}
                    onPress={onLogout}
                >
                    <IconTypedComponent 
                        type="Feather"
                        name="power"
                        size={20}
                    />
                </TouchableOpacity>
            )
        }
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacingSize,
        borderRadius: spacingSize,
        backgroundColor: getColor('red'),
        width: 40,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 2,
        elevation: 5,
    }
})

export default TopBarNavigator