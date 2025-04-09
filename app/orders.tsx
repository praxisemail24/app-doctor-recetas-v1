import React, { useCallback, useEffect, useState } from "react"
import { ThemedView } from "@/components/ThemedView"
import { FlatList } from "react-native"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { http } from "@/helpers/http"
import { Toast } from "toastify-react-native"
import { setOrders } from "@/redux/slices/authSlice"
import { Order } from "@/types/Category"
import { openBrowserAsync } from 'expo-web-browser'
import TopBarNavigator from "@/components/TopBarNavigator"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Colors } from "@/constants/Colors"
import CardOrder from "@/components/CardOrder"

const OrdersScreen = () => {
    const theme = useColorScheme()
    const user = useAppSelector(x => x.auth.user);
    const orders = useAppSelector(x => x.auth.orders);
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const getOrders = useCallback(() => {
        if(user) {
            setLoading(false)
            http.post(`/api/mis_ordenes/${user?.us_id}`, {}, {
                headers: {
                    Authorization: user?.token
                }
            }).then(({ data }) => {
                if(data.success) {
                    dispatch(setOrders(data.data))
                } else {
                    Toast.error(data.message)
                }
            }).finally(() => setLoading(false))
        }
    }, [user])

    useEffect(() => {
        getOrders()
    }, [getOrders])

    return (
        <>
            <ThemedView
                style={{
                    flex: 1,
                    backgroundColor: Colors[theme ?? 'light'].backgroundTheme,
                }}
            >
                <FlatList 
                    data={orders}
                    keyExtractor={(order: Order) => `${order.cp_code}`}
                    refreshing={loading}
                    onRefresh={() => getOrders()}
                    removeClippedSubviews={false}
                    ListHeaderComponent={() => <TopBarNavigator logOut={false} />}
                    renderItem={({ item, index }) => (
                        <CardOrder 
                            item={item}
                            key={index}
                        />
                    )}
                />
            </ThemedView>
        </>
    )
}

export default OrdersScreen