import React from 'react';
import './scss/app.scss';
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Header from "./components/Header";
import {Routes, Route, Navigate} from "react-router-dom";
import Cart from "./components/pages/Cart";
import FullPizza from "./components/PizzaBlock/fullPizza/FullPizza";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<Navigate to='/react_pizza'/>}/>
                    <Route path='/react_pizza' element={<Home/>}/>
                    <Route path='/react_pizza/:id' element={<FullPizza/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
