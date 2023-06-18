import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { fetchLoginUser } from '../reducers/UserReducer';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../reducers/OrderReducer';

const CheckOut = ({ total, cartproducts }) => {
    let dispatch = useDispatch()
    let { loginUser } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])


    function tokenHandler(token) {
        console.log(token);
        dispatch(createOrder({ token, total, cartproducts, loginUser }))
    }
    return (
        <div>
            <StripeCheckout
                stripeKey='pk_test_51KtVxhSAIlAmsg9EbJcTcjdNkbfzYusjdZirZWYvKuf6zDwjPYQZWhhhnd173MeZzTEfk6nlexxDeGjVfTIhbRsz00zRgCAr28'
                amount={total * 100}
                shippingAddress
                token={tokenHandler}
                currency='INR' >
                <Button className='btn'> Place Order </Button>
            </StripeCheckout>
        </div>
    )
}

export default CheckOut
