import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchLoginUser } from '../../reducers/UserReducer';
import { getcart } from '../../reducers/CartReducer';
import { MDBBadge, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { FiShoppingCart } from 'react-icons/fi';
import './Navbar.css'
import { NavLink } from 'react-router-dom';



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

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 50) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);

    return (
        <>
            <nav className={colorChange ? 'Mainheader scrollcolor' : 'Mainheader'}>
                <h2 className='headerimage'>Yummy Pizza</h2>
                <div className={menuIcon ? "navbars actives" : "navbars"}>
                    <div className="navul">
                        <ul className="navbar-lists">
                            <li>
                                <NavLink
                                    to="/"
                                    className="navbar-link"
                                    onClick={() => setMenuIcon(false)}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin"
                                    className="navbar-link"
                                    onClick={() => setMenuIcon(false)}>
                                    Admin
                                </NavLink>
                            </li>
                            {
                                text == 'logged in' ?
                                    <>

                                        <div className="dropdown">
                                            <div className=" navimageprofile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={"http://localhost:9300/" + loginUser.image} alt="" />
                                            </div>
                                            <ul className="dropdown-menu im" aria-labelledby="dropdownMenuButton1">
                                                <NavLink className="dropdown-item" to={`/Profile/${loginUser._id}`} onClick={() => setMenuIcon(false)}>Profile</NavLink>
                                                <NavLink className="dropdown-item" to="/order" onClick={() => setMenuIcon(false)}>order</NavLink>
                                                <NavLink className="dropdown-item" to="/logout" onClick={() => setMenuIcon(false)}>logout</NavLink>
                                            </ul>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <NavLink
                                                to="/login"
                                                className="navbar-link"
                                                onClick={() => setMenuIcon(false)}>
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/registration"
                                                className="navbar-link"
                                                onClick={() => setMenuIcon(false)}>
                                                Register
                                            </NavLink>
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
