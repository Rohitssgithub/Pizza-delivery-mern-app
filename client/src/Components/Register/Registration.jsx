import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registration } from '../../reducers/UserReducer';
import './Register.css'

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [file, setFile] = useState('');
    const [adddata, setAddData] = useState({
        username: '',
        email: '',
        age: '',
        gender: '',
        contact: '',
        password: '',
        confirmPassword: "",
    })
    const handleFileChange = (event) => {
        // console.log(event.target.file)
        const selectedFile = event.target.files[0];
        // console.log(selectedFile)
        setFile(selectedFile);
    }
    const handleOnChange = (e) => {
        setAddData({ ...adddata, [e.target.name]: e.target.value })
    }

    const handlesubmitdata = (event) => {
        event.preventDefault();
        console.log(adddata)

        const uploadData = new FormData();
        console.log(uploadData)
        console.log(file)

        uploadData.append('username', adddata.username);
        uploadData.append('email', adddata.email);
        uploadData.append('age', adddata.age);
        uploadData.append('gender', adddata.gender);
        uploadData.append('contact', adddata.contact);
        uploadData.append('image', file);
        uploadData.append('password', adddata.password);
        uploadData.append('confirmPassword', adddata.confirmPassword);
        console.log(uploadData)

        dispatch(registration(uploadData))
        navigate('/login')
    }

    return (
        <>
            <div className='container regiter-box text-center d-flex align-items-center flex-column'>
                <h3 className='mb-4'>Login Here</h3>
                <form className='row justify-content-center main-regiter-form' onSubmit={handlesubmitdata}>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="text" name='username' placeholder='name' value={adddata.username} onChange={handleOnChange} className="form-control" id="floatingInput" />
                            <label for="floatingInput">username</label>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="email" name='email' placeholder='email' value={adddata.email} onChange={handleOnChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">Email</label>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="number" name='age' placeholder='age' value={adddata.age} onChange={handleOnChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">Age</label>
                        </div>
                    </div>
                    <div className='col-md-5 genders'>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name='gender' value='female' onChange={handleOnChange} />
                            <label className="form-check-label" for="inlineRadio1">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name='gender' value='male' onChange={handleOnChange} />
                            <label className="form-check-label" for="inlineRadio2">male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name='gender' value='other' onChange={handleOnChange} />
                            <label className="form-check-label" for="inlineRadio3">Other</label>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="number" name='contact' placeholder='contact' value={adddata.contact} onChange={handleOnChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">Contact</label>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="file" name='image' onChange={handleFileChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">Image</label>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="password" name='password' placeholder='password' value={adddata.password} onChange={handleOnChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">password</label>
                        </div>
                    </div>

                    <div className='col-md-5'>
                        <div className="form-floating mb-3">
                            <input type="password" name='confirmPassword' placeholder='confirmPassword' value={adddata.confirmPassword} onChange={handleOnChange} className="form-control" id="floatingPassword" />
                            <label for="floatingPassword">confirmPassword</label>
                        </div>
                    </div>

                    <div className='col-12 '>
                        <button className='btn btn-primary px-4' >Register</button>

                    </div>
                </form>
                <p>Already user ? <Link to='/Login'>Login</Link></p>
            </div>
        </>
    )
}

export default Registration
