import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../reducers/OrderReducer';
import { Button, Table } from 'react-bootstrap';
import { deliverOrder } from '../../reducers/OrderReducer';

const AllOrders = () => {
    let dispatch = useDispatch()
    const { allOrders, loading } = useSelector((state) => state.order)
    console.log(allOrders)

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])


    return (
        <>
            <div className='container'>
                <div className='row m-0 p-0'>
                    <h4> All Orders List</h4>
                    <div className='table-responsive'>
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Email</th>
                                    <th>User Id</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders && allOrders.map((order) => {
                                    return (
                                        <tr>
                                            <td style={{ verticalAlign: "middle" }}> {order._id} </td>

                                            <td style={{ verticalAlign: "middle" }}> {order.email} </td>

                                            <td style={{ verticalAlign: "middle" }}> {order.userId} </td>

                                            <td style={{ verticalAlign: "middle" }}> {order.orderAmount} </td>

                                            <td style={{ verticalAlign: "middle" }}> {order.createdAt.substring(0, 10)} </td>

                                            <td style={{ verticalAlign: "middle" }}>
                                                {order.isDelivered ?
                                                    (<h5>Delivered</h5>) :
                                                    (<Button className="btn"
                                                        onClick={() => dispatch(deliverOrder(order._id))}>
                                                        Deliver
                                                    </Button>)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table >
                    </div>

                </div>
            </div>

        </>
    )
}

export default AllOrders
