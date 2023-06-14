import React from 'react'
import { useState } from 'react';
import close from '../../Images/close.svg'
import { useNavigate } from 'react-router';
import { resetPassword } from '../../utils/utils.api';
import { useAppContext } from '../../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reset({ setReset }) {
  const [email, setEmail] = useState('');
  const [resetAnswer, setResetAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {userType } = useAppContext();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleResetAnswerChange = (e) => {
    setResetAnswer(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let resetDetails = {
      email,
      resetAnswer,
      password,
      confirmPassword
    }
    resetPassword(resetDetails ,userType).then(data =>{
      data.status === "Success" ? toast.success("Password Updated Pls Login" , {
        position : 'top-right'
      }): toast.info(data.message , {
        position : 'top-right'
      })
    })
  };

  return (
    <div className='resetMainContainer'>
      <div className='reset'>
        <div className='titleContainer'>
          <h2>Reset Answer</h2>
          <img src={close} alt='Close button' id='resetCloseImage' onClick={() => navigate('/')} />
        </div>
        <form onSubmit={handleSubmit} className='form1'>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="resetAnswer">Reset Answer</label>
            <input
              type="text"
              id="resetAnswer"
              value={resetAnswer}
              onChange={handleResetAnswerChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Reset