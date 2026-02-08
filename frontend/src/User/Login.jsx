import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const {error,success,isAuthenticated} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
        dispatch(login({email: loginEmail, password: loginPassword}));
        
    }

     useEffect(() => {
                if (error) {
                  toast.error(error,{position:'top-center', autoClose:3000});
                  dispatch(removeErrors())
                }
              },[dispatch, error])

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/')
        }
    },[isAuthenticated])

    useEffect(() => {
        if (success) {
            toast.success("Logged in successfully",{position:'top-center', autoClose:3000});
            dispatch(removeSuccess());
        }
    },[dispatch, success])

  return (
   <div className="form-container container">
    <div className="form-content">
        <form action="" className="form" onSubmit={loginSubmit} >
            <div className="input-group">
                <input type="email" placeholder='Email' name='email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="input-group">
                <input type="password" placeholder='Password' name='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}  />
            </div>
            <button className="authBtn">SignIn</button>
            <p className="form-links">Forgot your password? <Link to="/password/forgot">Reset Password</Link></p>
            <p className="form-links">Don't have an account? <Link to="/register">Sign up here</Link></p>
        </form>
    </div>
   </div>
  )
}

export default Login
