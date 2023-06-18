import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../reducers/OrderReducer';
import { fetchLoginUser } from '../../reducers/UserReducer';
import { Link } from 'react-router-dom';
import './Order.css'
const Order = () => {

    let { loginUser } = useSelector((state) => state.users)
    console.log(loginUser)

    let orders = useSelector((state) => state.order.orders)
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
                <h5>{orders.length == 0 ? ' not found' : 'My Orders'}</h5>
                {
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
