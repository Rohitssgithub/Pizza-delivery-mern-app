import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizza } from '../../reducers/PizzReducer';
import { Link } from 'react-router-dom';
// import PizzList from './PizzList';
import { deletePizza } from '../../reducers/PizzReducer';


const ShowAllPizza = () => {
    let dispatch = useDispatch()


    const { allPizzas, loading } = useSelector((state) => state.pizza)
    console.log(allPizzas)
    let [search, setSearch] = useState('')


    useEffect(() => {
        dispatch(fetchAllPizza())
    }, [])

    const getfilterPizza = (e) => {
        setSearch(e.target.value)
    }


    return (
        <>
            <div className='container'>
                <h4>Pizza list</h4>
                <input type="text" name="name" id="" className='my-3' placeholder='search pizza' onChange={getfilterPizza} />
                <div className='row'>
                    <table class="table border">
                        <thead>
                            <tr>
                                <th scope="col">Sr no</th>
                                <th scope="col">Image   </th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allPizzas.map((e, i) => {
                                console.log(e)
                                return (<tr>
                                    <th scope="row">{i + 1}</th>
                                    <td><img src={"http://localhost:9300/" + e.image} className='product-admin-image'></img></td>
                                    <td>{e.name}</td>
                                    <td>{e.category}</td>
                                    <td><Link to={`/update/${e._id}`}><button className='btn btn-primary'>UPDATE</button></Link></td>
                                    <td><button className='btn btn-danger' onClick={() => dispatch(deletePizza(e._id))}> DELETE</button></td>
                                </tr>)
                            })}

                        </tbody>
                    </table >
                </div>
                <button className='btn btn-primary'><Link className='link' to='/addpizza'>add pizza</Link></button>

            </div>

        </>
    )
}

export default ShowAllPizza
