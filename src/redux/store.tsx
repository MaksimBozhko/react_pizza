import { configureStore } from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        search: searchSlice,
        cart: cartSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch