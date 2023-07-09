import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userLogin } from '../../reducers/UserReducer';
import { useDispatch } from 'react-redux';
import './Login.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';


const signupSchema = Yup.object().shape({
  // email: Yup.string().email('Enter valid email').required("Required"),
  // password: Yup.string().min(8, 'Minimun character should be 8').required('Required')
  //   .matches(
  //     "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$",
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //   ),
  // confirmPassword: Yup.string().required('Required').oneOf([Yup.ref("password"), null], "Password must match"),
})

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
    // console.log(data)
    dispatch(userLogin(data))
  }

  // const onSubmit = (values) => {
  //   dispatch(userLogin(values))

  // }


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
              <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={onchangeans} class="form-control" id="floatingConfirm" placeholder="Password" />
              <label for="floatingConfirm">Confirm Password</label>
            </div>
            <button className='btn btn-primary px-4' onClick={handleSubmit}>Submit</button>
          </form>
          {/* <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={signupSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, handleChange, handleSubmit, handleBlur, values }) => (
              <Form Form onSubmit={handleSubmit} className='col-lg-4 col-md-5 col-10 main-form'>

                <div class="form-floating mb-3">
                  <input value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} placeholder='email'
                    id="floatingInput" className={`form-control  inp ${errors.email && touched.email && 'is-invalid'}`} />
                  <label for="floatingInput">Email address</label>
                  {
                    errors.email && touched.email ?
                      <p className='maainp'>{errors.email}</p> : null
                  }
                </div>
                <div class="form-floating mb-3">
                  <input value={values.password} name="password" placeholder='password' onChange={handleChange}
                    onBlur={handleBlur} className={`form-control inp ${errors.password && touched.password && 'is-invalid'}`} />
                  <label for="floatingPassword">Password</label>

                  {
                    errors.password && touched.password ?
                      <p className='maainp'>{errors.password}</p> : null
                  }

                </div>
                <div class="form-floating mb-3">
                  <input value={values.confirmPassword} name="confirmPassword" onChange={handleChange} onBlur={handleBlur} placeholder='confirm password'
                    className={`form-control inp ${errors.confirmPassword && touched.confirmPassword && 'is-invalid'}`} />
                  <label for="floatingConfirm">Confirm Password</label>
                  {
                    errors.confirmPassword && touched.confirmPassword ?
                      <p className='maainp'>{errors.confirmPassword}</p> : null
                  }
                </div>

                <button className='btn btn-primary px-4' onClick={handleSubmit}>Submit</button>

              </Form>
            )}
          </Formik> */}
        </div>
        <p>New user ? <Link to='/registration'>Register</Link></p>
      </div>
    </>
  )
}

export default Login
