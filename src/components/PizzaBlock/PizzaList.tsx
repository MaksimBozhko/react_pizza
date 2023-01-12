import React, {useEffect, useRef} from 'react';
import PizzaItem from "./PizzaItem";
import Skeleton from "./Skeleton";
import qs from 'qs'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {initialStateType, setFilters} from "../../redux/slices/filterSlice";
import {sorts} from "../filter/sort/Sort";

const PizzaList = () => {
    const fetchPizzas = () => {
        const search = searchValue ? `search=${searchValue}` : ''
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        setIsLoading(true)
        axios.get(`https://63b31dd2ea89e3e3db3e6a9a.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sort}&order=desc&${search}`)
            .then((arr: any) => {
                setPizzas(arr.data)
                setIsLoading(false)
            })
        //window.scrollTo(0, 0)
    }
    const searchValue = useAppSelector(state => state.search.searchValue)
    const {currentPage, categoryId, sort} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [pizzas, setPizzas] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
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
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])
    const pizzasList = pizzas.map((p: any) => <PizzaItem key={p.id} id={p.id} title={p.title} price={p.price}
                                                         img={p.imageUrl} sizes={p.sizes} types={p.types}/>)
    return (
        <div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : pizzasList}
            </div>
        </div>
    );
};

export default PizzaList;