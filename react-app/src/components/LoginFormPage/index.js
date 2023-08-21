import React, { useState, useEffect } from "react";
import { login } from "../../store/session";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  // const { closeModal } = useModal();
  const history = useHistory()
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState({});


  




// if (sessionUser) return <Redirect to="/" />;


const handleSubmit = async (e) => {
  e.preventDefault();

  const newFrontendErrors = {}; 

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!email) {
      newFrontendErrors.email = "Email required to log in.";
  } else if (!emailRegex.test(email)) {
      newFrontendErrors.email = "Invalid email format.";
  }
  
  if (!password) {
      newFrontendErrors.password = "Password required to log in.";
  }

  setFrontendErrors(newFrontendErrors); 

  if (Object.keys(newFrontendErrors).length === 0) {
      const data = await dispatch(login(email, password));
  if (data) {
    setErrors(data);
      } 
  }
};

const demoSignIn = async (e) => {
  e.preventDefault();
 const data = await dispatch(login('demo_lition@aa.io', "password"));
  history.push('/')
}


  const handleOnClick = async (e) => {
    e.preventDefault();
    history.push('/signup')
  }


  return (
    <>
      {/* <h1>Log In</h1> */}
      <form onSubmit={handleSubmit}>
        
        <div className="login-form-splash">

        
        <div className='errors-and-login'>
          {frontendErrors.email && email.length > 0 && (
            <p className='on-submit-errors'>{frontendErrors.email}</p>
          )}
          {frontendErrors.password  && (
            <p className='on-submit-errors'>{frontendErrors.password}</p>
          )}
          <p>
            {errors.length > 0 &&  (
              <p className='on-submit-errors'> Invalid Credentials</p>
            )}
          </p>
          {/* <ul className="error-messages">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
        </div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </label>

        
        <button type="submit">Log In</button>
        <button  type="submit" onClick={demoSignIn}>Demo User</button>
        <h2>---------- or ----------</h2>

        <div className="join-now-splash" 
                    onClick={handleOnClick}> New to Clockdn? Join now</div>
      
        </div>
                    </form>
    </>
  );
}

export default LoginFormPage;
