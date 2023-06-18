import React from 'react';
import { fetchLoginUser } from '../reducers/UserReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProtectedAdmin({ children }) {

    let { loginUser } = useSelector((state) => state.users)
    console.log(loginUser)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    if (!loginUser) {
        return <Navigate to="/login" replace></Navigate>;
    }
    if (loginUser && loginUser.isAdmin == false) {
        return <Navigate to="/" replace></Navigate>;
    }

    return children;
}

export default ProtectedAdmin
