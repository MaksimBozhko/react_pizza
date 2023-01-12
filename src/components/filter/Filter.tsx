import React from 'react';
import Categories from "./categories/Categories";
import Sort from "./sort/Sort";

const Filter = () => {
    return (
        <div className="content__top">
            <Categories />
            <Sort/>
        </div>
    );
};

export default Filter;