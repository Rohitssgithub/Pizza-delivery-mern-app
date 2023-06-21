import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUser, fetchsingleUser, fetchAllUsers } from '../../reducers/UserReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    let dispatch = useDispatch()

    let { allusers, currentUser } = useSelector((state) => state.users)
    console.log(currentUser)

    const [updateData, setUpdateData] = useState({});
    console.log(updateData)

    useEffect(() => {
        if (id) {
            const singleUser = currentUser.filter((ele) => ele._id === id);
            setUpdateData(singleUser[0])
        }
    }, [currentUser]);

    const newData = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        dispatch(fetchsingleUser(id))
    }, [])

    const [file, setFile] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('username', updateData.username);
        formData.append('email', updateData.email);
        formData.append('age', updateData.age);
        formData.append('gender', updateData.gender);
        formData.append('contact', updateData.contact);
        formData.append('image', file);
        formData.append('password', updateData.password);
        console.log(formData)
        dispatch(updateUser({ data: formData, id: id }));
    };
    return (
        <>
            <div className='container'>
                <form className=" mx-auto my-5 row update-user-admin" onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={updateData && updateData.username}
                            onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={updateData && updateData.email}
                            onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="text"
                            name="age"
                            className="form-control"
                            value={updateData && updateData.age}
                            onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="male"
                            type="radio"
                            checked={updateData && updateData.gender === "male"}
                            onChange={newData}
                        />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="female"
                            type="radio"
                            checked={updateData && updateData.gender === "female"}
                            onChange={newData}
                        />
                        <label className="form-check-label">Female</label>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="other"
                            type="radio"
                            checked={updateData && updateData.gender === "other"}
                            onChange={newData}
                        />
                        <label className="form-check-label">other</label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">contact</label>
                        <input
                            name="contact"
                            type="number"
                            className="form-control"
                            value={updateData && updateData.contact}
                            onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">password</label>

                        <input type="password" className="form-control" name='password' placeholder='password' value={updateData && updateData.password} onChange={newData} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">image</label>

                        <input type="file" name='image' className="form-control" onChange={handleFileChange} />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary ">
                            update and save
                        </button>
                        <button className="btn btn-primary mx-lg-2 my-2">
                            <Link className='link' to='/admin/userlist'>Go back</Link>
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default UpdateUser
