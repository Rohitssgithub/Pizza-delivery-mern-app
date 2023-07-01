import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../reducers/UserReducer';

const Logout = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(userLogOut())
        navigate('/')
    }, [])
    return (
        <>
            {/* logout */}
        </>
    )
}

export default Logout
