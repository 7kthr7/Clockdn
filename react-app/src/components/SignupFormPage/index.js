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
	const { closeModal } = useModal();

	console.log('PROFILE IMAGE--->', profileImage)

	useEffect(() => {
		const frontendErrors = {}

		if (firstName.length < 2) {
			frontendErrors.firstName = "First Name is required"
		}
		if (lastName.length < 2) {
			frontendErrors.lastName = "Last Name is required"
		}
		if (email.length < 2) {
			frontendErrors.email = "Email is required"
		}
		if (city.length < 2) {
			frontendErrors.city = "city is required"
		}
		if (state.length < 0) {
			frontendErrors.state = "First Name is required"
		}
		
		if (password.length < 6) {
			frontendErrors.password = "Password must be at least 6 characters"
		}
		if (confirmPassword.length < 2) {
			frontendErrors.confirmPassword = "Confirm Password is required"
		}
		setFrontendErrors(frontendErrors)
	}, [ firstName, lastName, email, city, state, occupation, biography, profileImage, password, confirmPassword])


	const handleSubmit = async (e) => {
		e.preventDefault();
		
		

		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, email, city, state, occupation, biography, profileImage, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};
	

	return (
		<>
			<h1>Sign Up</h1>
			<form  method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
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
					City
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</label>
				<label>
					State
					<input
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
					/>
				</label>
		
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
					About Me
					<input
						type="text"
						value={biography}
						onChange={(e) => setBiography(e.target.value)}
						required
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

			


				<button type="submit">Sign Up</button>
				{(imageLoading)&& <p>Loading...</p>}
			</form>
		</>
	);
}

export default SignupFormModal;