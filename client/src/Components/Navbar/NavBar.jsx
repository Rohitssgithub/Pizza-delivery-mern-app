import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchLoginUser } from '../../reducers/UserReducer';
import { getcart } from '../../reducers/CartReducer';
import { MDBBadge, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { FiShoppingCart } from 'react-icons/fi';
import './Navbar.css'



const NavBar = () => {
    let dispatch = useDispatch()
    const [menuIcon, setMenuIcon] = useState();


    let { loginUser } = useSelector((state) => state.users)
    // console.log(loginUser)


    const { cartproducts, total, quantity } = useSelector((state) => state.cart)


    const text = useSelector((state) => state.users.loginstatus)

    useEffect(() => {
        dispatch(getcart(loginUser._id))
    }, [loginUser])

    // let [currentUsers, setCurrentUser] = useState()
    // const callaboutpage = async () => {
    //     try {
    //         const res = await fetch('http://localhost:9300/about', {
    //             method: 'GET',
    //             mode: 'cors',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             credentials: 'include'
    //         })
    //         const data = await res.json()
    //         console.log(data)
    //         if (res.status === 401) {
    //             // navigate('/login')
    //             setCurrentUser(null)
    //             // navigate('/')
    //         }
    //         else {
    //             setCurrentUser(data)
    //             // navigate('/')
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        // callaboutpage()
        dispatch(fetchLoginUser())
    }, [])


    return (
        <>
            {/* <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Yummy Pizza</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item carts">
                                <Link className="nav-link carts" to="/cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className='cartspan'>{quantity}</span>
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admin">Admin</Link>
                            </li> */}
            {/* {
                                text == 'logged in' ?
                                    <>
                                        <div className="dropdown">
                                            <div className=" navimageprofile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={"http://localhost:9300/" + loginUser.image} alt="" />
                                            </div>
                                            <ul className="dropdown-menu im" aria-labelledby="dropdownMenuButton1">
                                                <Link className="dropdown-item" to={`/Profile/${loginUser._id}`}>Profile</Link>
                                                <Link className="dropdown-item" to="/logout">logout</Link>
                                            </ul>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/registration">Register</Link>
                                        </li>
                                    </>
                            }

                        </ul>
                    </div>
                </div>
            </nav> */}
            <nav className="Mainheader">
                <h2 className='headerimage'><Link to='/' className='linknavbar'>Yummy Pizza</Link></h2>
                <div className={menuIcon ? "navbars active" : "navbars"}>
                    <div className="navul">
                        <ul className="navbar-lists">
                            {
                                text == 'logged in' ?
                                    <>
                                        <div className="dropdown">
                                            <div className=" navimageprofile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={"http://localhost:9300/" + loginUser.image} alt="" />
                                            </div>
                                            <ul className="dropdown-menu im" aria-labelledby="dropdownMenuButton1">
                                                <Link className="dropdown-item" to={`/Profile/${loginUser._id}`} onClick={() => setMenuIcon(false)}>Profile</Link>
                                                <Link className="dropdown-item" to="/logout" onClick={() => setMenuIcon(false)}>logout</Link>
                                                <Link className="dropdown-item" to="/order" onClick={() => setMenuIcon(false)}>order</Link>

                                            </ul>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link
                                                to="/login"
                                                className="navbar-link"
                                                onClick={() => setMenuIcon(false)}>
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/registration"
                                                className="navbar-link"
                                                onClick={() => setMenuIcon(false)}>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                            }
                            <li>
                                <Link to="/cart" className="navbar-link cart-trolley-link" onClick={() => setMenuIcon(false)}>
                                    <FiShoppingCart className="cart-trolley" />
                                    <span className="cart-total-item"> {quantity} </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <button className="close-nav" onClick={() => setMenuIcon(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>

                <div className="open-nav">
                    <button onClick={() => setMenuIcon(true)}> <i class="fa-solid fa-list"></i>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar
