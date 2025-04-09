import { Order } from "@/types/Category";
import { IUser } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    signIn: boolean,
    user?: IUser | null,
    orders: Order[],
}

const initialState : AuthState = {
    signIn: false,
    user: null,
    orders: [],
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state: AuthState, { payload }: PayloadAction<IUser>) => {
            state.signIn = true
            state.user = payload
        },
        logout: (state: AuthState) => {
            state.signIn = false
            state.user = null
            state.orders = []
        },
        setOrders: (state: AuthState, { payload }: PayloadAction<Order[]>) => {
            state.orders = payload
        },
    }
})

export const { setAuth, logout, setOrders, } = authSlice.actions

export default authSlice.reducer