import React, { useState } from 'react';
import { useAppContext } from '../../contexts/ContextProvider';
import { login } from '../../utils/utils.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


function Login({ setLog }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userType, changeUserType, setUserDetails } = useAppContext();
  const [load , setload] = useState(true);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setload(false);
    const newUser = {
      email,
      password
    }
    login(newUser, userType === "Vendor" ? "vendor" : "user").then((res) => {
      if(res.status === "Success"){
        toast.success("Successfully LoggedIn" , {
          position : 'top-right'
        })
        setUserDetails(res)
        userType === "Vendor" ? navigate('/vendor/proposals') : navigate('/user/proposals')
      }else{
        toast.error(res.message , {
          position : 'top-right'
        })
        setload(true)
      }
    })
  };



  return (
    <div className='formHolder'>
      <div className='buttonHolder' >
        <button className={userType === 'Vendor' ? "currentUserType" : ""}
          onClick={() => changeUserType(userType => userType === "User" ? "Vendor" : "User")}
        >Vendor</button>
        <button className={userType === 'User' ? "currentUserType" : ""}
          onClick={() => changeUserType(userType => userType === "Vendor" ? "User" : "Vendor")}
        >User</button>
      </div>
      <div className='topicHolder'>Sign In to your account</div>
      <form onSubmit={handleSubmit} method='post' action='#' className='content'>
        <input type="email"  value={email} onChange={handleEmailChange}
          placeholder='Email' required
        />
        <input
          type="password"
          value={password}
          placeholder='password'
          onChange={handlePassword}
          required
        />
        <div className='forgotPassword'>
          <a href="/reset"
          >forgot password?</a>
        </div>
        <div className='registerBlock'>
          <button type="submit">{load ? "Sign In" :  <span className='loader'></span>}</button>
        </div>
        <button className='siginButton'
          onClick={() => setLog(isLog => !isLog)}
        >Register</button>
      </form>
      <ToastContainer/>
    </div>

  )
}

export default Login;