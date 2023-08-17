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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newFrontendErrors = {}

		const email_validation = email.split("").find((el) => el === "@");


		if (!firstName) {
			newFrontendErrors.firstName = "First Name is required"
		}
		if (!lastName) {
			newFrontendErrors.lastName = "Last Name is required"
		}
		if (!email) {
			newFrontendErrors.email = "Email is required"
		}
		
		if (!email_validation) {
			newFrontendErrors.email = "Email is required";
		}
		
		if (!city) {
			newFrontendErrors.city = "city is required"
		}
		if (!state) {
			newFrontendErrors.state = "State is required"
		}

		if (password.length < 6) {
			newFrontendErrors.password = "Password must be at least 6 characters"
		}
		if (confirmPassword.length < 6) {
			newFrontendErrors.confirmPassword = "Confirm Password is required"
		}
		setFrontendErrors(newFrontendErrors)

		if (Object.keys(newFrontendErrors).length === 0) {
			const data = await dispatch(signUp(firstName, lastName, email, city, state, occupation, biography, profileImage, password));
			if (data) {
				setErrors(data);
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
				{errors.map((error, index) => (
    <p key={index} className='on-submit-errors'>{error}</p>
	
))}
				</ul>
				<div className="sign-up-form-splash">
					<h2>Make every second count</h2>
					<div className="sign-up-name">
						<label>
							First Name
							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</label>
						{frontendErrors.firstName && firstName.length > 0 && <p className='on-submit-errors'>{frontendErrors.firstName}</p>}

						<label>
							Last Name
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</label>
						{frontendErrors.lastName && lastName.length > 0 && <p className='on-submit-errors'>{frontendErrors.lastName}</p>}

					</div>
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					{frontendErrors.email && email.length > 0 && <p className='on-submit-errors'>{frontendErrors.email}</p>}

					<div className="sign-up-location">
						<label>
							City
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</label>
						{frontendErrors.city && city.length > 0 && <p className='on-submit-errors'>{frontendErrors.city}</p>}

						<label>
							State
							<input
								type="text"
								value={state}
								onChange={(e) => setState(e.target.value)}
								required
							/>
						</label>
						{frontendErrors.state && state.length < 0 && <p className='on-submit-errors'>{frontendErrors.state}</p>}

					</div>

					<label>
						Occupation
						<input
							type="text"
							value={occupation}
							onChange={(e) => setOccupation(e.target.value)}
							required
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
								required
							/>
						</label>

						<label>
							Confirm Password
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>


					</div>

					
{frontendErrors.email && <p className='on-submit-errors'>{frontendErrors.email}</p>}

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