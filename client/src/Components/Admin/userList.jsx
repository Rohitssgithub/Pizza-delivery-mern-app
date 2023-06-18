import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../reducers/UserReducer';
import { deleteuser } from '../../reducers/UserReducer';
import { searchUser } from '../../reducers/UserReducer';
const UserList = () => {

    let dispatch = useDispatch();
    let { allusers, searchData } = useSelector((state) => state.users)
    console.log(allusers);


    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        console.log('hi')
        dispatch(fetchAllUsers());
    }, []);

    const [searchDatas, setSearchData] = useState("");

    const changefun = (e) => {
        setSearchData(e.target.value)
    }

    useEffect(() => {
        dispatch(searchUser(searchDatas));
    }, [searchDatas]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <>
            <div className='container'>
                <h4> All Users List</h4>
                <input type="text" placeholder='search user' className='my-3' onChange={changefun} />
                <table className="table table-responsive border">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col"> name</th>
                            <th scope="col">image</th>
                            <th scope="col">age</th>
                            <th scope="col">gender</th>
                            <th scope="col">contact</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {allusers && allusers.length > 0 ?
                            allusers
                                .filter((curelem) => {
                                    if (searchData.length === 0) {
                                        return curelem;
                                    }
                                    else {
                                        return curelem.username.toLowerCase().includes(searchData.toLowerCase());
                                    }
                                })
                                .map((curelem, index) => {
                                    return (
                                        <tr key={curelem._id}>
                                            <td scope="row">{index + 1}</td>
                                            <td scope="row">{curelem.username}</td>
                                            <td scope="row"><img src={"http://localhost:9300/" + curelem.image} className='admin-user-image' alt="userimage" /></td>
                                            <td scope="row">{curelem.age}</td>
                                            <td scope="row">{curelem.gender}</td>
                                            <td scope="row">{curelem.contact}</td>
                                            <td scope="row">{curelem.email}</td>
                                            <td scope="row">
                                                {/* <Button variant="outline-primary"><Link className='link' to={`/
                                        edit/${curelem._id}`}>View</Link></Button> */}
                                                <button className='btn btn-primary mx-2'><Link className='link' to={`/edit/${curelem._id}`}>Update</Link></button>
                                                <button className='btn btn-primary' onClick={() => dispatch(deleteuser(curelem._id))}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }) : 'no data '
                        }
                    </tbody>
                </table>
            </div>
            <button className='btn btn-primary'><Link className='link' to="/addUser">Add user</Link></button>
        </>
    )
}

export default UserList
