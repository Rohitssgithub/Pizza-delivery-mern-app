import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addcart } from "../../reducers/CartReducer"
import { fetchLoginUser } from '../../reducers/UserReducer';
import { getcart } from '../../reducers/CartReducer';
import { Link } from 'react-router-dom';
import './Pizza.css'
import Modal from 'react-bootstrap/Modal';

const Pizza = ({ pizza }) => {
  let dispatch = useDispatch()

  const [varient, SetVarient] = useState('small')
  const [quantity, setQuantity] = useState(1)

  const { cartproducts } = useSelector((state) => state.cart)


  let { loginUser } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchLoginUser())
  }, [])

  useEffect(() => {
    dispatch(getcart(loginUser._id))
  }, [loginUser])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <div className='pizzabox shadow-lg p-3 mb-5 bg-body rounded'>
        <div className='imagediv'>
          <p><strong>{pizza.name}</strong></p>
          <p>{pizza.category}</p>
          <img className='image-pizza' src={"http://localhost:9300/" + pizza.image} onClick={handleShow} alt="image" />
        </div>


        <div className='flex-container'>
          <div className='w-100 m-1'>
            <p>Sizes:</p>
            <select className='form-control' value={varient} onChange={(e) => { SetVarient(e.target.value) }}>
              {
                pizza.varients.map((ele) => {
                  return (<option value={ele}>{ele}</option>)
                })
              }
            </select>
          </div>

          <div className='w-100 m-1'>
            <p>Quantity:</p>
            <select className='form-control' value={quantity} onChange={(e) => { setQuantity(parseInt(e.target.value)) }}>
              {[...Array(10).keys()].map((x, i) => {
                return <option value={i + 1}>{i + 1}</option>
              })}
            </select>
          </div>
        </div >
        <div className='flex-container'>
          <div className='m-1 w-100'>
            <p className='mt-2'>Price:{pizza.prices[0][varient] * quantity} Rs/-</p>
          </div>
          <div className='m-1 w-100'>
            {
              loginUser ? <button className='btn btn-primary add-tocart-btn' onClick={() => {
                dispatch(addcart({ name: pizza.name, price: pizza.prices[0][varient] * quantity, quantity: quantity, userID: loginUser._id, image: pizza.image, productID: pizza._id, variants: varient }))
              }}>ADD TO CART</button>
                :
                <button className='btn btn-primary'><Link className='link' to='/login'>Add to cart</Link></button>
            }
          </div>
        </div>
      </div>

      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='maind'>
          <div className='modal-image'>
            <img src={"http://localhost:9300/" + pizza.image} className='img-fluid' />
          </div>

          <p className='p-2 mt-3'>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button variant="secondary" className='btn btn-primary' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>

      </Modal>
    </>
  )

}

export default Pizza
