import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type sortType = {
    name: 'популярности' | 'цене' | 'алфавиту'
    sort: 'rating' | 'price' | 'title'
}
export type initialStateType = {
    currentPage: number
    categoryId: number
    sort: sortType
}

const initialState: initialStateType = {
    currentPage: 1,
    categoryId: 0,
    sort: {name: 'популярности', sort: 'rating'}
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<sortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<initialStateType>) {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer