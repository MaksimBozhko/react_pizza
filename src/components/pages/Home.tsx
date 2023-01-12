import React from 'react';
import PizzaList from "../PizzaBlock/PizzaList";
import Pagination from "../pagination/Pagination";
import Filter from "../filter/Filter";

const Home = () => {

    return (
            <div className="container">
                <Filter />
                <PizzaList />
                <Pagination />
            </div>
    );
};

export default Home;