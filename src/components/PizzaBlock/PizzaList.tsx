import React, {useEffect, useRef} from 'react';
import PizzaItem from "./PizzaItem";
import Skeleton from "./Skeleton";
import qs from 'qs'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Link, useNavigate} from "react-router-dom";
import {initialStateType, setFilters} from "../../redux/slices/filterSlice";
import {sorts} from "../filter/sort/Sort";
import {fetchPizzas} from "../../redux/slices/pizzaSlice";

const PizzaList = () => {
    const getPizzas = async () => {
        const search = searchValue ? `search=${searchValue}` : ''
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        dispatch(fetchPizzas({currentPage, category, sort, search}))
        //window.scrollTo(0, 0)
    }
    const searchValue = useAppSelector(state => state.search.searchValue)
    const {currentPage, categoryId, sort} = useAppSelector(state => state.filter)
    const {items, status} = useAppSelector(state => state.pizza)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef<boolean>(false)
    const isMounted = useRef<boolean>(false)
    //если был первый рендер, то вшивать параметры в URL
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sort.sort,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true // true после первого рендера
    }, [categoryId, sort, currentPage])
    //если был первый рендер, проверяем есть ли URL параметры и сохраняем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sorts.find((s) => s.sort === params.sort)
            const categoryId = Number(params.categoryId)
            const currentPage = Number(params.currentPage)
            if (sort) {
                const obj: initialStateType = {sort, categoryId, currentPage}
                dispatch(setFilters(obj))
            }
            isSearch.current = true
        }
    }, [])
    // если пришли параметры из URL, то запрос делать не нужно т.к это будет вторая перерисовка
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])
    const pizzasList = items.map((p: any) => <Link to={`/react_pizza/${p.id}`}><PizzaItem key={p.id} id={p.id} title={p.title} price={p.price}
                                                                       img={p.imageUrl} sizes={p.sizes} types={p.types} /> </Link>)
    return (
        <div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'error'
                    ? <h2>Sorry, error</h2>
                    :status === 'success'
                        ? pizzasList
                        : [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                }
            </div>
        </div>
    );
};

export default PizzaList;