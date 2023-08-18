import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  // const { closeModal } = useModal();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState({});


  

const demoSignIn = async (e) => {
    e.preventDefault();
    const email = "demo_lition@aa.io"
    const password = "password"
    await dispatch(login(email, password));
    history.push('/')
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const newFrontendErrors = {}; // Temporary error object
    
    const email_validation = email.split("").find((el) => el === "@");
    
    if (!email) {
        newFrontendErrors.email = "The email or password entered are invalid.";
    }
    if (!email_validation) {
        newFrontendErrors.email = "The email or password entered are invalid.";
    }
    if (!password) {
        newFrontendErrors.password = "The email or password entered are invalid.";
    }

    setFrontendErrors(newFrontendErrors); 

    if (Object.keys(newFrontendErrors).length === 0) {
        const data = dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
       
    }
};

  const handleOnClick = async (e) => {
    e.preventDefault();
    history.push('/signup')
  }


  return (
    <>
      {/* <h1>Log In</h1> */}
      <form onSubmit={handleSubmit}>
        
        <div className="login-form-splash">
        
       

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className='errors-and-login'>
          {frontendErrors.email && email.length < 0 && (
            <p className='on-submit-errors'>{frontendErrors.email}</p>
            )}
          {frontendErrors.password && password.length > 0 && (
            <p className='on-submit-errors'>{frontendErrors.password}</p>
            )}
          {errors.length ? (
            <span>
          The email or password entered are invalid.
          </span>
        ) : null}
         
        </div>
  
        <button onClick={demoSignIn}>Demo User</button>
        <button type="submit">Log In</button>

        <h2>---------- or ----------</h2>
        <div className="join-now-splash" 
                    onClick={handleOnClick}> New to Clockdn? Join now</div>
      
        </div>
      </form>
    </>
  );
}

export default LoginFormPage;
