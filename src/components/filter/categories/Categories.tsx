import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {setCategoryId} from "../../../redux/slices/filterSlice";

const Categories = () => {
    const categoryId = useAppSelector(state => state.filter.categoryId)
    const dispatch = useAppDispatch()
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая']
    const categoriesBlock = categories.map((c, i) => {
        return <li key={i} className={categoryId === i ? 'active' : ''}
                   onClick={() => dispatch(setCategoryId(i))}>{c}</li>
    })
    return (
        <div className="categories">
            <ul>
                {categoriesBlock}
            </ul>
        </div>
    );
};

export default Categories;