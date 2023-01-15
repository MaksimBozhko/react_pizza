import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";

export type PizzaType = {
    id: string
    imageUrl: string
    title: string
    category: number
    price: number
    rating: number
    sizes: Array<number>
    types: Array<number>
}

type initialStateType = {
    items: Array<PizzasItemType>
    status: 'loading' | 'success' | 'error'
    fullPizza: any
}
export type PizzasItemType = {
    id: number
    title: string
    price: number
    img: string
    sizes: Array<number>
    types: Array<number>
}

const initialState: initialStateType = {
    items: [],
    status: 'loading',
    fullPizza: {}
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: any) => {
        const {currentPage, category, sort, search} = params
        const {data} = await axios
            .get(`https://63b31dd2ea89e3e3db3e6a9a.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sort}&order=desc&${search}`)
        return data
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizza(state, action: PayloadAction<PizzaType>) {
            state.fullPizza = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.fulfilled.toString()]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        [fetchPizzas.rejected.toString()]: (state) => {
            state.status = 'error'
        }
    }
})

export const {setPizza} = pizzaSlice.actions

export default pizzaSlice.reducer