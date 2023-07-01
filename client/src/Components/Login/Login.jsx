import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userLogin } from '../../reducers/UserReducer';
import { useDispatch } from 'react-redux';
import './Login.css'

const Login = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()


  let [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const onchangeans = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    dispatch(userLogin(data))
  }


  return (
    <>
      <div className='container login-box text-center'>
        <h3 className='mb-4'>Login Here</h3>
        <div className='row main-row justify-content-center m-0 p-0'>
          <form className='col-lg-4 col-md-5 col-10 main-form'>
            <div class="form-floating mb-3">
              <input type="email" name="email" value={data.email} onChange={onchangeans} class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" name="password" value={data.password} onChange={onchangeans} class="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={onchangeans} class="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Confirm Password</label>
            </div>
            <button className='btn btn-primary px-4' onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <p>New user ? <Link to='/registration'>Register</Link></p>
      </div>
    </>
  )
}

export default Login
