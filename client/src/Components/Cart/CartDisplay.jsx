import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { cartDelete } from '../../reducers/CartReducer'
import { increaseQuantity, decreaseQuantity } from '../../reducers/CartReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartDisplay = ({ data }) => {
    const dispatch = useDispatch()

    const { cartproducts } = useSelector((state) => state.cart)
    // console.log(cartproducts)

    let { loginUser } = useSelector((state) => state.users)
    // console.log(loginUser)



    return (
        <>
            <div >
                <div className='row d-flex align-items-center text-center gap-4 p-md-4 p-2' style={{ boxShadow: " 0 0 5px" }}>
                    <div className='col-md-3 main-cart'>
                        <p>Pizza Name: <strong>{data.name}</strong></p>
                        <p>PRICE: <strong>{data.price}</strong></p>
                        <p>varient:<strong>{data.variants}</strong></p>
                    </div>
                    <div className='col-md-3 main-cart text-center'>
                        <img src={"http://localhost:9300/" + data.image} className='cart-image'></img>
                    </div>
                    <div className='col-md-3 main-cart text-center'>
                        <button className='btn btn-primary' onClick={() => dispatch(increaseQuantity({ productID: data._id, userID: loginUser._id }))}>+</button>
                        <span className='mx-2'>{data.quantity}</span>
                        <button className='btn btn-primary' onClick={() => dispatch(decreaseQuantity({ productID: data._id, userID: loginUser._id }))}>-</button>
                    </div>
                    {/* <h6>QUANTITY: <button className='btn btn-danger' onClick={() => {
                        dispatch(updatecart({ message: "decrement", data: data }))
                    }}>-</button> {data.quantity}{data.quantity == 10 ? <button className='btn btn-primary' >+</button> : <button className='btn btn-primary' onClick={() => {
                        dispatch(updatecart({ message: "increment", data: data }))
                    }}>+</button>}</h6> */}
                    <div className='col-1 main-cart text-center ms-auto mx-2'>
                        <i className="fa-solid fa-trash delete-icon" onClick={() => {
                            dispatch(cartDelete(data)), toast.success("removed")
                        }}></i>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartDisplay
