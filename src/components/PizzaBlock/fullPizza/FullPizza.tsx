import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {PizzaType, setPizza} from "../../../redux/slices/pizzaSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";

const FullPizza = () => {
    const fullPizza = useAppSelector((state): PizzaType => state.pizza.fullPizza)
    const dispatch = useAppDispatch()
    const {id} = useParams()
    useEffect(() => {
        axios.get(`https://63b31dd2ea89e3e3db3e6a9a.mockapi.io/items/` + id)
            .then(({data}) => {
                dispatch(setPizza(data))
            })
    }, [])
    return (
        <div className='container'>
            <img width={300} src={fullPizza.imageUrl} alt=""/>
            <h2>{fullPizza.title}</h2>
            <p>{fullPizza.price}</p>
        </div>
    );
};

export default FullPizza;