import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import HomePage from '../Feed';
// import logo from '../../Images/Logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				{/* <HomePage/> */}
				<NavLink exact to="/feed">Home</NavLink>
				{/* <img src={logo} style={{ width: '50px', height: '50px' }} /> */}
			<ProfileButton user={sessionUser} />
			</li>
			{isLoaded && sessionUser && (
				
	
				<li>
				<NavLink exact to = "/profile"> PROFILE </NavLink>
					
				</li>
				
			

				
			)}
		</ul>
	);
}

export default Navigation;