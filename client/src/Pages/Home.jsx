import React, { useEffect, useState } from 'react';
import Pizza from '../Components/pizza/Pizza';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizza } from '../reducers/PizzReducer';
import Loading from '../Components/Loading/Loading';
import FilterBurgers from '../Components/FilterPizza';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';
import { BsFillArrowUpCircleFill } from "react-icons/bs";


const Home = () => {
    let dispatch = useDispatch()
    const { allPizzas, loading, searchData, error } = useSelector((state) => state.pizza)
    console.log(searchData)
    console.log(error)


    useEffect(() => {
        dispatch(fetchAllPizza())
    }, [])

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const gotoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    window.addEventListener('scroll', toggleVisible);
    return (
        <>
            <div className='container pizza-container p-2'>
                <FilterBurgers></FilterBurgers>

                <div className='row text-center justify-content-center m-0 p-0'>
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


            {
                visible ?
                    <BsFillArrowUpCircleFill className='jdssjn' onClick={gotoTop} />
                    : ''
            }
        </>
    )
}

export default Home
