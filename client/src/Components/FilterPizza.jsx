import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPizza } from '../reducers/PizzReducer';
import { searchInfo } from '../reducers/PizzReducer';

const FilterBurgers = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    console.log(search)
    console.log(category)

    const { allPizzas, loading } = useSelector((state) => state.pizza)
    console.log(allPizzas)

    useEffect(() => {
        dispatch(fetchAllPizza())
    }, [])

    const getfilterPizza = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
    }
    const handleCategory = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value)
    }

    useEffect(() => {
        dispatch(searchInfo(allPizzas.filter((e) => {
            if (category == 'all') {
                return e.name.toLowerCase().includes(search.toLowerCase())
            }
            else {
                return e.name.toLowerCase().includes(search.toLowerCase()) && e.category.toLowerCase() == category.toLowerCase()
            }
        }
        )))
    }, [search, category])
    return (
        <div className="container m-0 p-0  mb-3">
            <form className="row justify-content-center m-0 py-3 align-items-center shadow  bg-white rounded filter-box">
                <div className="col-md-3 mt-2">
                    <input value={search} className="form-control" type="text" onChange={getfilterPizza} placeholder="Search Fat-Burgers"></input>
                </div>
                <div className="col-md-3  mt-2" >
                    <select value={category} className="form-control w-100 " onChange={handleCategory} >
                        <option value="all">ALL</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                    </select>
                </div>
            </form>
        </div>
    )


}

export default FilterBurgers;