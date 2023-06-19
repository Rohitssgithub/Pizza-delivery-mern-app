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
