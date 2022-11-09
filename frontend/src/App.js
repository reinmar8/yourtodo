import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ToastContainer limit={1} position='top-center' autoClose={3000}/>

      <Routes>
        <Route path='/' element={<SignInPage/>}/>
        <Route path='/yourtodo' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </div>
  );
}

export default App;
