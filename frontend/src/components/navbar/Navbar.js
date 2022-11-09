import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Store } from '../../Store';
import '../navbar/Navbar.css';

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [ hover, setHover ] = useState(false);
  console.log(userInfo)

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    Navigate('/');
  }
  return (
    <div className='header'>
        <nav className='navbar'>
            <Link to='/yourtodo'>
              <h1>Your<span>Todo.</span></h1>
            </Link>
            
            <div className='menu'>
                {/* <p>{ userInfo ? userInfo.username : 'Sign-In'}</p> */}
                {
                  userInfo ? (
                    <div className='dropdown'>
                      <Link to='/yourtodo'>
                        {userInfo.username}
                      </Link>
                      <div className='dropdown-menu'>
                        <Link 
                          to='/'
                          onClick={signoutHandler}
                        >
                          Signout
                        </Link>
                      </div>
                      
                    </div>
                    
                  ) : (
                    <Link to='/'>
                      Signin
                    </Link>
                  )
                }
            </div>
        </nav>

    </div>
  )
}

export default Navbar