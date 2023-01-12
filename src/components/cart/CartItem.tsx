import React from 'react';
import {addItem, itemsType, minusItem} from "../../redux/slices/cartSlice";
import {useAppDispatch} from "../../hooks/hooks";

const CartItem = ({id, title, price, types, sizes, img, count}: itemsType) => {
    const dispatch = useAppDispatch()
    const addItemHandler = () => {
        const item = {id, title, price, types, sizes, img, count}
        dispatch(addItem(item))
    }
    const removeItemHandler = () => {
        dispatch(minusItem(id))
    }
    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image" src={img} alt="Pizza"/>
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>{types} тесто, {sizes} см.</p>
            </div>
            <div className="cart__item-count">
                <div onClick={removeItemHandler} className="button button--outline button--circle cart__item-count-minus">
                </div>
                <b>{count}</b>
                <div onClick={addItemHandler} className="button button--outline button--circle cart__item-count-plus">
                </div>
            </div>
            <div className="cart__item-price">
                <b>{price} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div  className="button button--outline button--circle">
                </div>
            </div>
        </div>
    );
};

export default CartItem;