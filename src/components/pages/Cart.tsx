import React from 'react';
import CartItem from "../cart/CartItem";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {clearItems} from "../../redux/slices/cartSlice";
import CartEmpty from "../cart/CartEmpty";

const Cart = () => {
    const {items, totalCount, totalPrice} = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const itemsCart = items.map(item => <CartItem id={item.id} title={item.title}
                                                  price={item.price} img={item.img}
                                                  sizes={item.sizes} types={item.types} count={item.count} />)
    const onClearCartHandler = () => {
        dispatch(clearItems())
    }
    return (
        <div className="container container-cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        Корзина
                    </h2>
                    <div onClick={onClearCartHandler} className="cart__clear">
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div className="content__items">
                    {itemsCart.length > 0 ? itemsCart : <CartEmpty />}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                        <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <NavLink to="/" className="button button--outline button--add go-back-btn">
                            <span>Вернуться назад</span>
                        </NavLink>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;