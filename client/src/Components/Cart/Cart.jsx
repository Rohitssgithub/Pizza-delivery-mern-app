import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getcart } from '../../reducers/CartReducer';
import { fetchLoginUser } from '../../reducers/UserReducer';
import CartDisplay from './CartDisplay';
import './Cart.css'
import Loading from '../Loading/Loading';
import CheckOut from '../CheckOut';

const Cart = () => {
    let dispatch = useDispatch()
    const { cartproducts, total, quantity, loading } = useSelector((state) => state.cart)

    let { loginUser } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    useEffect(() => {
        dispatch(getcart(loginUser._id))
    }, [loginUser])


    return (
        <>
            <div className='container'>
                {loading && <Loading />}

                {
                    cartproducts.length == 0 ?
                        <div className='text-center row empty-cart-data m-0 p-0'>
                            <h1>Cart Is Empty</h1>
                            <div className='cart-image-blank'>
                            </div>
                            <Link to='/' className='shop-link'>Shop Here</Link>
                        </div>
                        :
                        <>
                            <div className='row justify-content-center cart-box gy-2 m-0 p-0'>
                                <p>Total products:{cartproducts.length}</p>

                                {
                                    cartproducts.map((ele) => {
                                        return (
                                            <div className='col-10 cart-product-box'>
                                                <CartDisplay data={ele}></CartDisplay>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='container mt-5'>
                                <div className='row justify-content-center m-0 p-0'>
                                    <div className="col-lg-4 col-md-8 col-11">
                                        <div className="card mb-4">
                                            <div className="card-header py-3">
                                                <h5 className="mb-0">Summary</h5>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Total Quantity
                                                        <span>{quantity}</span>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                        </div>
                                                        <span>
                                                            <strong>{total}</strong>
                                                        </span>
                                                    </li>
                                                </ul>

                                                {/* <Link to='/'>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-block"
                                    >
                                        Go to checkout
                                    </button>
                                </Link> */}
                                                <CheckOut total={total} cartproducts={cartproducts}></CheckOut>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                }



            </div>


        </>
    )
}

export default Cart
