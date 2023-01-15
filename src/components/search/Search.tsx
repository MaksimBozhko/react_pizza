import React, {ChangeEvent} from 'react';
import './Search.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setSearchValue} from "../../redux/slices/searchSlice";

const Search = () => {
    const searchValue = useAppSelector(state => state.search.searchValue)
    const dispatch = useAppDispatch()

    return (
        <div className={'root'}>
            <input value={searchValue}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchValue(e.currentTarget.value))}
                   placeholder='Search' className={'input'}/>
        </div>
    )
};

export default Search;