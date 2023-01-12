import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

export type itemsType = {
    id: number
    title: string
    price: number
    img: string
    sizes: number
    types: string
    count: number
}
export type initialStateType = {
    totalPrice: number
    totalCount: number
    items: itemsType[]
}

const initialState: initialStateType = {
    totalPrice: 0,
    items: [],
    totalCount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<itemsType>) {
            let findItem: itemsType | undefined = state.items.find((obj: itemsType) => obj.id === action.payload.id)
            findItem ? findItem.count++ : state.items.push({...action.payload, count: 1})
            state.totalPrice = state.items.reduce((acc: number, obj: itemsType) => (obj.price * obj.count) + acc, 0)
            state.totalCount = state.items.reduce((acc: number, obj: itemsType) => obj.count + acc, 0)
        },
        minusItem(state, action) {
            let findItem: itemsType | undefined = state.items.find((obj: itemsType) => obj.id === action.payload)
            if (findItem) findItem.count--
            if (findItem && findItem.count == 0) {
                state.items = state.items.filter(item => item.id !== action.payload)
            }
            state.totalPrice = state.items.reduce((acc: number, obj: itemsType) => (obj.price * obj.count) + acc, 0)
            state.totalCount = state.items.reduce((acc: number, obj: itemsType) => obj.count + acc, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }

    }
})

export const {addItem, minusItem, clearItems} = cartSlice.actions

export default cartSlice.reducer