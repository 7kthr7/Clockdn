import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import logo from '../../Images/Logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
				{/* <img src={logo} style={{ width: '50px', height: '50px' }} /> */}
			</li>
			{isLoaded && sessionUser && (
				<li>
					<ProfileButton user={sessionUser} />
					<NavLink exact to = "/feed"> FEED </NavLink>
				</li>

				
			)}
		</ul>
	);
}

export default Navigation;