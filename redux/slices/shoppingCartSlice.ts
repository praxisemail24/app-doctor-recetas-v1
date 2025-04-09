import { Product } from "@/types/Product";
import { ItemCart } from "@/types/ShoppingCart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShoppingCartState = {
    items: ItemCart<Product>[],
}

const initialState: ShoppingCartState = {
    items: [],
}

const shoppingCart = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItem: (state: ShoppingCartState, { payload }: PayloadAction<ItemCart<Product>>) => {
            const index = state.items.findIndex(x => x.pq_id === payload.pq_id)
            if(index === -1) {
                state.items = [...state.items, payload]
            } else {
                throw new Error('El paquete ya se encuentra agregado al carrito.')
            }
        },
        removeItem: (state: ShoppingCartState, { payload }: PayloadAction<string>) => {
            const index = state.items.findIndex(x => x.id == payload)
            if(index !== -1) {
                state.items.splice(index, 1)
            }
        },
        clearCart: (state: ShoppingCartState) => {
            state.items = []
        }
    },
})

export const { addItem, removeItem, clearCart } = shoppingCart.actions
export default shoppingCart.reducer