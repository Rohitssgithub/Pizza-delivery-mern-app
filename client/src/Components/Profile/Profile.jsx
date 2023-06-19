import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteuser, fetchsingleUser, fetchAllUsers, fetchLoginUser } from '../../reducers/UserReducer';
import { useParams } from 'react-router-dom';
import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
    let history = useNavigate()
    let dispatch = useDispatch()
    const [update, setUpdate] = useState(false)
    const [file, setFile] = useState('');

    const { id } = useParams()


    // const { currentUser } = useSelector((state) => state.users)
    // console.log(currentUser)


    const [userData, setUserData] = useState({});
    console.log(userData)

    const handles = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const callaboutpage = async () => {
        try {
            const res = await fetch(`http://localhost:9300/get/user/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data.user)
            if (res.status === 401) {
                history('/login')
            }
            else {
                setUserData(data.user[0])
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        callaboutpage()
    }, [])




    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }


    const updateData = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('age', userData.age);
        formData.append('gender', userData.gender);
        formData.append('contact', userData.contact);
        formData.append('image', file);
        formData.append('password', userData.password);
        console.log(formData)
        dispatch(updateUser({ data: formData, id: id }));
    }

    const deleteAccount = (id) => {
        dispatch(deleteuser(id))
    }



    return (
        <>
            {
                update ?
                    <>
                        <div className='container update-box text-center d-flex align-items-center flex-column'>
                            <form className='row justify-content-center update-profile-box' onSubmit={updateData}>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="text" name='username' value={userData && userData.username} onChange={handles} class="form-control" id="floatingInput" />
                                        <label for="floatingInput">username</label>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="email" name='email' value={userData && userData.email} onChange={handles} class="form-control" id="floatingPassword" />
                                        <label for="floatingPassword">Email</label>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="number" name='age' value={userData && userData.age} onChange={handles} class="form-control" id="floatingPassword" />
                                        <label for="floatingPassword">Age</label>
                                    </div>
                                </div>
                                <div className='col-md-5 genders'>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name='gender' value='female' checked={userData && userData.gender === "female"} onChange={handles} />
                                        <label class="form-check-label" for="inlineRadio1">female</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name='gender' value='male' checked={userData && userData.gender === "male"} onChange={handles} />
                                        <label class="form-check-label" for="inlineRadio2">Male</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name='gender' value='other' checked={userData && userData.gender === "other"} onChange={handles} />
                                        <label class="form-check-label" for="inlineRadio3">Other</label>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="text" name='gender' value={userData && userData.contact} onChange={handles} class="form-control" id="floatingPassword" />
                                        <label for="floatingPassword">Contact</label>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="file" name='image' onChange={userData && handleFileChange} class="form-control" id="floatingPassword" />
                                        <label for="floatingPassword">Image</label>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div class="form-floating mb-3">
                                        <input type="text" name='gender' value={userData && userData.password} onChange={handles} class="form-control" id="floatingPassword" />
                                        <label for="floatingPassword">password</label>
                                    </div>
                                </div>

                                <div className='col-12'>
                                    <button className='btn btn-primary px-4 mx-2' >Save & Update</button>
                                    <button className='btn btn-primary px-4' onClick={() => setUpdate(false)}>Go back</button>
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    <div className='container profile-div text-center d-flex align-items-center justify-content-center p-3'>
                        <div className='row justify-content-center  profile-box p-2'>
                            <div className='col-md-5 col-10 image-section d-flex flex-column align-items-center justify-content-center'>
                                <div className='imagedivs'>
                                    <img src={"http://localhost:9300/" + userData.image} className='profile-img' alt="" />
                                </div>
                                <p className='mt-3'><strong>{userData.username}</strong></p>
                            </div>
                            <div className='col-md-7 col-10 info-section'>
                                <p>Name : {userData.username}</p>
                                <p>Email : {userData.email}</p>
                                <p>Age : {userData.age}</p>
                                <p>Gender : {userData.gender}</p>
                                <p>Contact : {userData.contact}</p>
                                <div>
                                    <button className='btn btn-danger save-btn' onClick={() => setUpdate(true)}>update</button>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteAccount(userData._id)}>Delete Account</button>
                                </div>

                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Profile
