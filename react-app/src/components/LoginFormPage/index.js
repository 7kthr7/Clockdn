import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState({});


  
  useEffect(() => {
    const frontendErrors = {}
    
    const email_validation = email.split("").find((el) => el === "@")
    
    if (!email_validation) {
      frontendErrors.email = "Email required to log in."
    }
    if (!password) {
      frontendErrors.password = "Password is required to log in."
    }
    
    setFrontendErrors(frontendErrors)
  }, [email, password])
  
  if (sessionUser) return <Redirect to="/" />;


  const demoSignIn = async (e) => {
    e.preventDefault();
    const email = "demo_lition@aa.io"
    const password = "password"
    dispatch(login(email, password ));
     
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  return (
    <>
      {/* <h1>Log In</h1> */}
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
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
          {frontendErrors.email && email.length > 0 && (
            <p className='on-submit-errors'>{frontendErrors.email}</p>
          )}
          {frontendErrors.password && password.length > 0 && (
            <p className='on-submit-errors'>{frontendErrors.password}</p>
          )}
          <p>
            {errors.map((error, idx) => (
              <p className='on-submit-errors' key={idx}>{error}</p>
            ))}
          </p>
        </div>
        <button onClick={demoSignIn}>Demo User</button>

        <button type="submit">Log In</button>
      
        </div>
      </form>
    </>
  );
}

export default LoginFormPage;
