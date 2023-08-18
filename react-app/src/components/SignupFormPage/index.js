import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupForm.css";


function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [occupation, setOccupation] = useState("");
	const [biography, setBiography] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [frontendErrors, setFrontendErrors] = useState({})

	console.log('PROFILE IMAGE--->', profileImage)
	// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
	// if (!email) {
	// 	newFrontendErrors.email = "Email required to log in.";
	// } else if (!emailRegex.test(email)) {
	// 	newFrontendErrors.email = "Invalid email format.";
	// }

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		const newFrontendErrors = {}

		if (firstName.length < 2) {
			newFrontendErrors.firstName = "First Name is required"
		}
		if (lastName.length < 2) {
			newFrontendErrors.lastName = "Last Name is required"
		}
		if (email.length < 2) {
			newFrontendErrors.email = "Email is required"
		}
		if (city.length < 2) {
			newFrontendErrors.city = "city is required"
		}
		if (state.length < 0) {
			newFrontendErrors.state = "First Name is required"
		}
		
		if (password.length < 6) {
			newFrontendErrors.password = "Password must be at least 6 characters"
		}
		if (confirmPassword.length < 2) {
			newFrontendErrors.confirmPassword = "Confirm Password is required"
		}
		setFrontendErrors(newFrontendErrors)
	//  [ firstName, lastName, email, city, state, occupation, biography, profileImage, password, confirmPassword])

		if (Object.keys(newFrontendErrors).length === 0) {
			setErrors({});
			const data = await dispatch(signUp(firstName, lastName, email, city, state, occupation, biography, profileImage, password));
			if (data) {
		  setErrors(data);
			}  else {
				history.push('/')
			}
		}
	  };


	const handleOnClick = async (e) => {
		e.preventDefault();
		history.push('/login')
	}


	return (
		<>
			{/* <h1>Sign Up</h1> */}
			<form className="sign-up-wrapper" method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
				<ul>
				
				</ul>
				<div className="sign-up-form-splash">
					<h2>Make every second count</h2>
					{frontendErrors.firstName && ( <p className='on-submit-errors'>{frontendErrors.firstName}</p>)}
					{frontendErrors.lastName && ( <p className='on-submit-errors'>{frontendErrors.lastName}</p>)}
					{frontendErrors.city &&  (<p className='on-submit-errors'>{frontendErrors.city}</p>)}
					{frontendErrors.state && ( <p className='on-submit-errors'>{frontendErrors.state}</p>)}
					{frontendErrors.password && ( <p className='on-submit-errors'>{frontendErrors.password}</p>)}
					{frontendErrors.confirmPassword && ( <p className='on-submit-errors'>{frontendErrors.confirmPassword}</p>)}
					{frontendErrors.email && ( <p className='on-submit-errors'>{frontendErrors.email}</p>)}

					<div className="sign-up-name">
						<label>
							First Name

							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
						
							/>
						</label>

						<label>
							Last Name
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							
							/>
						</label>

					</div>
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							
						/>
					</label>
					{/* {frontendErrors.email && email.length > 0 && <p className='on-submit-errors'>{frontendErrors.email}</p>} */}

					<div className="sign-up-location">
						<label>
							City
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								
							/>
						</label>

						<label>
							State
							<input
								type="text"
								value={state}
								onChange={(e) => setState(e.target.value)}
							
							/>
						</label>

					</div>

					<label>
						Occupation
						<input
							type="text"
							value={occupation}
							onChange={(e) => setOccupation(e.target.value)}
							
						/>
					</label>
					<label>
						About Me (Optional)
						<textarea
							id="sign-up-biography"
							value={biography}
							onChange={(e) => setBiography(e.target.value)}

						/>
					</label>

					<div >
						<label >
							<input


								type="file"
								onChange={(e) => setProfileImage(e.target.files[0])}
								accept=".jpg, .jpeg, .png"

							/>
						</label>

					</div>
					<div className="sign-up-password">

						<label>
							Password
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							
							/>
						</label>

						<label>
							Confirm Password
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								
							/>
						</label>


					</div>

					

					<button type="submit">Sign Up</button>
					<h2>---------- or ----------</h2>

					<div className="join-now-splash"
						onClick={handleOnClick}>Already have an account? Log-In</div>

					{(imageLoading) && <p>Loading...</p>}
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;