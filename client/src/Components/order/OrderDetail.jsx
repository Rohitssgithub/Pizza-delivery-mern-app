import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { singleOrder } from '../../reducers/OrderReducer';
import axios from 'axios';

const OrderDetail = () => {
    const { id } = useParams();
    let dispatch = useDispatch()
    // let orders = useSelector((state) => state.order.singleOrders)
    // console.log(orders)

    let [orders, setOrders] = useState({})
    const [arrayValues, setArrayValues] = useState([]);
    const [obj, setObj] = useState({});



    useEffect(() => {
        // dispatch(singleOrder(id))
        axios.get("http://localhost:9300/single-order/" + id, { withCredentials: true })
            .then((data) => {
                console.log(data.data.data)
                setOrders(data.data.data)
                setArrayValues(data.data.data.orderItems)
                setObj(data.data.data.shippingAddress)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(orders)
    console.log(arrayValues)
    console.log(obj)




    return (
        <>
            <div className='container'>
                <div className='row m-0 p-0'>
                    <div className='col-lg-8 product-box-order'>
                        {
                            arrayValues.map((ele) => {
                                return (
                                    <div className='row p-4'>
                                        <div className='col d-flex detail-product-box'>
                                            <img src={"http://localhost:9300/" + ele.image} className='cart-image'></img>
                                            <div>
                                                <p>Name : {ele.name}</p>
                                                <p>Quantity : {ele.quantity}</p>
                                                <p>Price : {ele.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='col-lg-4 detail-box-order p-3'>
                        <div className='text-start  shipping-address-detail' >
                            <h5>Shipping Address</h5>
                            <hr style={{ height: 2 }}></hr>
                            <div style={{ fontWeight: 600 }}>
                                <p>City: {obj.city}</p>
                                <p>Country: {obj.country}</p>
                                <p>Pincode: {obj.pincode}</p>
                            </div>
                        </div>
                        <div className='text-start  order-detail' >
                            <h5><>Order Details </></h5>
                            <hr style={{ height: 2 }}></hr>
                            <div style={{ fontWeight: 600 }} >
                                <p>Order amount: {orders.orderAmount}</p>
                                {/* <p>Ordered on: {orders.createdAt.slice(0, 10)}</p> */}
                                <p>Trasaction ID: {orders.transactionId} </p>
                                <p>Delivered: {orders.isDelivered ? ' Delivered' : 'Not Delivered'}</p>
                                <p>Order ID: {orders._id}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default OrderDetail
