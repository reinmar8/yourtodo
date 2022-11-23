import React, { useState, useContext, useEffect } from 'react';
import '../pages/RegisterPage.css';
import axios from 'axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo) {
          navigate('/yourtodo');
        }
      },[userInfo ,navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password === confPassword) {
           try {
                const { data } = await axios.post('/api/users/register',
                    {
                        username,
                        password
                    }
                );
                dispatch({ type:'USER_SIGNIN', payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/yourtodo');
            } catch (error) {
                console.log(error, 'error')
                toast.error(getError(error))
            } 
        }
        else {
            console.log('Password Did not match')
            toast.error('Password did not match')
        }
        
    }

  return (
    <div className='small-container'>
        <form onSubmit={submitHandler}>
            <h1>Register</h1>
            <input type='text'placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} value={username} required/>
            <input type='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} value={password} required/>
            <input type='password' placeholder='Confirm Password' onChange={(e) => {setConfPassword(e.target.value)}} value={confPassword} required/>
            <button className='btn-register'>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage