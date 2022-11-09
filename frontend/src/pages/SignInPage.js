import React, { useContext, useEffect, useState } from 'react';
import './SignInPage.css';
import axios from 'axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/signin', {
        username,
        password,
      });
      dispatch({ type:'USER_SIGNIN', payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/yourtodo');
    } catch (error) {
      toast.error(getError(error));
    }
  }

  const RouteChange = () => {
    navigate('/register');
  }
  
  return (
    <div className='signin'>
        <div className='signin-container'>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Username' required onChange={(e) => {setUsername(e.target.value)}}/>
                <input type='password' placeholder='Password' required onChange={(e) => {setPassword(e.target.value)}}/>
                <button className='btn-signin' type='submit'>Sign-In</button>
                <button className='btn-register' onClick={RouteChange}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default SignInPage