import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminNav = () => {
    return (
        <>
            <ul className="tabs  p-0 mb-5">
                <NavLink
                    className="navbar-link admin-link"
                    to='userlist'
                >
                    UserList
                </NavLink>
                <NavLink
                    className="navbar-link admin-link"
                    to='allpizza'
                >
                    All Pizza
                </NavLink>
                <NavLink
                    className="navbar-link admin-link"
                    to='allorders'
                >
                    All Orders
                </NavLink>
            </ul>
        </>
    )
}

export default AdminNav
