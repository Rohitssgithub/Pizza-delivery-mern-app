import React, { useEffect, useState } from 'react';
// import { addProductToCart } from '../reducers/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deletePizza, updatePizza } from '../../reducers/PizzReducer';
import { Link } from 'react-router-dom';

const PizzList = ({ pizza }) => {
    console.log(pizza)
    let dispatch = useDispatch()

    // let { allPizzas } = useSelector((state) => state.pizza)
    // console.log(allPizzas)

    const [varient, SetVarient] = useState('small')
    const [quantity, setQuantity] = useState(1)

    const delet = () => {
        console.log(pizza._id)
        dispatch(deletePizza(pizza._id))
    }

    return (
        <>
            {/* <div className='pizzabox'>
                <p>{pizza.name}</p>
                <p>{pizza.category}</p>
                <img src={"http://localhost:9300/" + pizza.image} alt="image" />
                <select value={varient} onChange={(e) => { SetVarient(e.target.value) }}>
                    {
                        pizza.varients.map((ele) => {
                            return (<option value={ele}>{ele}</option>)
                        })
                    }
                </select> */}
            {/* <select value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                    {[...Array(10).keys()].map((x, i) => {
                        return <option value={i + 1}>{i + 1}</option>
                    })}
                </select> */}

            {/* <p>Price:{pizza.prices[0][varient] * quantity} Rs/-</p>
            </div>
            <button variant="outline-primary"><Link className='link' to={`/update/${pizza._id}`}>Update</Link></button>
            <button onClick={delet}>remove</button> */}
            <h1>pizza list</h1>
            <table class="table ">
                <thead>
                    <tr>
                        {/* <th scope="col">sr no</th> */}
                        <th scope="col">image   </th>
                        <th scope="col">name</th>
                        <th scope="col">category</th>
                        <th scope="col">actions</th>

                    </tr>
                </thead>
                <tbody>
                    {/* {pizza.map((e, i) => { */}
                    <tr>
                        {/* <th scope="row">{i + 1}</th> */}
                        <td><img src={`http://localhost:9300/${pizza.image}`} className='rounded-circle w-25'></img></td>
                        <td>{pizza.name}</td>
                        <td>{pizza.category}</td>
                        <td><Link to={`/update/${pizza._id}`}><button className='btn btn-primary'>UPDATE</button></Link></td>
                        <td><button className='btn btn-danger' onClick={delet}>DELETE</button></td>
                    </tr>
                    {/* })} */}

                </tbody>
            </table>
        </>
    )

}

export default PizzList
