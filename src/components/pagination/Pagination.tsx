import React from 'react';
import './Pagination.scss'
import ReactPaginate from "react-paginate";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = () => {
    const currentPage = useAppSelector(state => state.filter.currentPage)
    const dispatch = useAppDispatch()
    return <ReactPaginate
        className={'root'}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => dispatch(setCurrentPage(e.selected+1))}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage-1}
        previousLabel="<"
    />
};

export default Pagination;