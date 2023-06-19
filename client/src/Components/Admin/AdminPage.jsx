import React, { useState } from 'react';
import { fetchLoginUser } from '../../reducers/UserReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UserList from './userList';
import ShowAllPizza from './ShowAllPizza';
import AllOrders from './AllOrders';


const AdminPage = () => {
    let { loginUser } = useSelector((state) => state.users)
    console.log(loginUser)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLoginUser())
    }, [])

    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    };


    return (
        <>
            <div className="container mt-3" style={{ height: '100vh' }} >
                <div className='row'>
                    <ul className="tabs">
                        <li
                            className={`tab col-2 ${activeTab === 0 ? "active rounded-pill" : ""}`}
                            onClick={() => handleClick(0)}
                        >
                            UserList
                        </li>
                        <li
                            className={`tab col-2 ${activeTab === 1 ? "active  rounded-pill" : ""}`}
                            onClick={() => handleClick(1)}
                        >
                            All Pizza
                        </li>
                        <li
                            className={`tab col-2 ${activeTab === 2 ? "active  rounded-pill" : ""}`}
                            onClick={() => handleClick(2)}
                        >
                            All Orders
                        </li>
                    </ul>
                    <div className="tab-content">
                        {activeTab === 0 && <UserList />}
                        {activeTab === 1 && <ShowAllPizza />}
                        {activeTab === 2 && <AllOrders />}
                    </div>
                </div>

            </div>

        </>
    )
}

export default AdminPage
