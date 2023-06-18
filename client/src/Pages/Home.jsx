import React, { useEffect, useState } from 'react';
import Pizza from '../Components/pizza/Pizza';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizza } from '../reducers/PizzReducer';
import Loading from '../Components/Loading/Loading';
import FilterBurgers from '../Components/FilterPizza';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';

const Home = () => {
    let dispatch = useDispatch()
    const { allPizzas, loading, searchData, error } = useSelector((state) => state.pizza)
    console.log(searchData)
    console.log(error)


    useEffect(() => {
        dispatch(fetchAllPizza())
    }, [])
    return (
        <>
            <div className='container pizza-container'>
                <FilterBurgers></FilterBurgers>

                <div className='row text-center'>
                    {loading && <Loading />}
                    {
                        error && <ErrorComponent error='Something went wrong' />
                    }
                    {
                        searchData.map((piz) => {
                            return (
                                <div className='col-lg-4 col-md-6 col-sm-6'>
                                    <div key={piz._id} >
                                        <Pizza pizza={piz}></Pizza>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home
