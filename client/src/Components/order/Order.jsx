import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../reducers/OrderReducer';
import { fetchLoginUser } from '../../reducers/UserReducer';
import { Link } from 'react-router-dom';
import './Order.css'
import Loading from '../Loading/Loading';
const Order = () => {

    let { loginUser } = useSelector((state) => state.users)
    console.log(loginUser)

    let orders = useSelector((state) => state.order.orders)
    let load = useSelector((state) => state.order.loading)

    console.log(orders)

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder(loginUser._id))
    }, [loginUser])

    return (
        <>

            <div className='container p-3'>
                {load && <Loading />}
                {
                    orders.length == 0 ?
                        <div className='text-center row empty-order-data m-0 p-0'>
                            <h1>Order Not Found</h1>
                            <div className='blank-image-order'>
                                <img src='https://img.freepik.com/free-vector/empty-concept-illustration_114360-7416.jpg?w=740&t=st=1687181609~exp=1687182209~hmac=67e7e78b849f4a190dbda51816d5dd7139c7415ab39bff582fbcbf848dcdf5ae' alt="order-not-found" />
                            </div>
                            <Link to='/' className='shop-link'>Shop Here</Link>
                        </div>
                        :

                        orders.map((ele) => {
                            return (
                                <>
                                    <div className='row mb-4 p-3 rounded order-main-box'>
                                        {ele.orderItems.map((el) => {
                                            return (
                                                <>
                                                    <div className='col-lg-7 product-box-orders '>
                                                        <div className='order-image-box'>
                                                            <img src={"http://localhost:9300/" + el.image} className='mainsimage'></img>
                                                        </div>
                                                        <div>
                                                            <p>Name : {el.name}</p>
                                                            <p>Quantity : {el.quantity}</p>
                                                            <p>Price : {el.price}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        <div>
                                            <button className='btn btn-danger order-detail-btn mt-3'><Link className='orderdetail-link' to={`/orderdetail/${ele._id}`}>Order Details</Link></button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                }
            </div>
        </>
    )
}

export default Order
