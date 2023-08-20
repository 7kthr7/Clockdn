import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/clockdnLogo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const location = useLocation();



	const handleLogoClick = () => {
		history.push('/');
	};
	const handleLogIn = () => {
		history.push('/login');
	};
	const handleSignUp = () => {
		history.push('/signup');
	};
    const isSignupPage = location.pathname === '/signup';
	const isLoginPage = location.pathname === '/login';

    const navClassName = isSignupPage || isLoginPage ? 'navigation-bar signup-nav' : 'navigation-bar';


	return (
        <nav className={navClassName}>
            <NavLink exact to="/" onClick={handleLogIn}>
                <img
                    src={logo}
                    className='logo'
                />
            </NavLink>

            {!isSignupPage && !isLoginPage && (
                <>
                    {!sessionUser && (
                        <div className='icons-login-container'>
                            <div className='navigation-icons' onClick={handleLogIn}>
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
                                <div id='join-now' >
                                    <button onClick={handleSignUp}>Join Now</button>
                                </div>
                                <button onClick={handleLogIn}>Log In</button>
                            </div>
                        </div>
                    )}
                    {isLoaded && sessionUser && (
                        <>
                            <div className='search-nav' >
                            <label>
    <input 
      placeholder='search connections' 
      onFocus={() => document.getElementById('tooltip').style.display = 'block'} 
      onBlur={() => document.getElementById('tooltip').style.display = 'none'} 
    />
    <div id="tooltip" className="tooltip-message">Search feature coming soon!</div>
  </label>
</div>
                            <div className='search-bar-navigation'>
                            <ProfileButton user={sessionUser} />

                            </div>

                            </>
                    )}
                    
                </>
            )}
        </nav>
    );
}

export default Navigation;