import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginUser } from '../reducers/UserReducer';
import { useEffect } from 'react';

function Protected({ children }) {
    console.log(children)

    let { loginUser } = useSelector((state) => state.users)
    console.log('pro')
    console.log(loginUser)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    if (!loginUser) {
        return <Navigate to="/login" replace></Navigate>;
    }
    return children;
}

export default Protected;
