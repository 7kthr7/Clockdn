import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/clockdnLogo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const { closeModal } = useModal();


	const handleLogoClick = () => {
		history.push('/');
	};
	const handleIconClick = () => {
		history.push('/login');
	};


	return (
		<nav className='navigation-bar'>

			<NavLink exact to="/" onClick={handleLogoClick}>
				<img
					src={logo}
					className='logo'
				/>
			</NavLink>
			{!sessionUser && (
				
				
			
			<div className='icons-login-container'>
			
				
			<div className='navigation-icons' onClick={handleIconClick}>
				<div className='read-icon'>
				<span class="material-symbols-sharp">
					newsmode
				</span>
				<h3>read</h3>
				</div>
				<div className='read-icon'>
				<span class="material-symbols-sharp">
					edit_square
				</span>
				<h3>write</h3>
				</div>
				<div className='read-icon'>
				<span class="material-symbols-sharp">
					diversity_3
				</span>
				<h3>connect</h3>
				</div>
			</div>
			
			<div className='profile-navigation'>
				<div id='join-now'>
			<OpenModalButton
			 
              buttonText="Join Now"
              onItemClick={closeModal}
              modalComponent={<SignupFormModal />}		  
            />
			</div>
			<OpenModalButton
              buttonText="Log In"
              onItemClick={closeModal}
              modalComponent={<LoginFormModal />}
			  
            />
			</div>
			</div>
			)}
			

			{isLoaded && sessionUser && (
				<>
				
		 <ProfileButton user={sessionUser} /> 
				
				
				<NavLink exact to="/profile"> PROFILE </NavLink>


				</>



			)}
		</nav>

	);
}

export default Navigation;