
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import GitHubLogo from '../../assets/github.png'
import Linkdn from '../../assets/linkdn.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    //     document.addEventListener("mousedown", closeMenuOutsideClick);

    //     return () => {
    //       document.removeEventListener("mousedown", closeMenuOutsideClick);
    //     };
    // }, [showMenu]);

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    closeMenu()
    history.push('/');
  };

  const handleManageAccount = (e) => {
    e.preventDefault();
    closeMenu()
    history.push('/profile');
  };

  const handleLogoClick = () => {
    history.push('/home');
  };

  const handleConnections = () => {
    history.push('/connections');
  };

  const closeMenu = () => setShowMenu(false);
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-dropdown-page">
      <div id="profile-dropdown-img">
        <img
          onClick={openMenu}
          src={user.profile_image}

        />
      </div>
      {/* <div id="git-hub-icon">
        <img 
        
        src={Linkdn}
        />
      <img 
      
      src={GitHubLogo}
      />
      
</div> */}

      {/* <div id="git-hub-icon">
        <a href="https://www.linkedin.com/in/kawthar-mohamud/" target="_blank" rel="noopener noreferrer">
          <img src={Linkdn} alt="LinkedIn Logo" />
        </a>
        <a href="https://github.com/7kthr7/Clockdn" target="_blank" rel="noopener noreferrer">
          <img src={GitHubLogo} alt="GitHub Logo" />
        </a>
        <p>github</p>
      </div> */}

      <div className='read-icon'>
        <a style={{ textDecoration: "none" }} href="https://blog.appacademy.io/" target="_blank" rel="noopener noreferrer" class="material-symbols-sharp">
          newsmode
        </a>
        <h3>News</h3>
        </div>

        
        <div className='read-icon'>
        <a onClick={handleConnections} class="material-symbols-sharp">
          diversity_3
        </a>
        <h3>My Connections</h3>
        </div>
        <div className='read-icon'>
          <span class="material-symbols-outlined">
            Home
          </span>
          <h3>home</h3>
        </div>

      {showMenu && <div className="overlay" />}

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-content">
            <>
              <div className="profile-dropdown-one">
                <img
                  src={user.profile_image}

                />
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.occupation}</p>

                <button onClick={handleManageAccount} className="manage-account-button" type="submit">View Profile</button>
              </div>

              <div style={{ cursor: "pointer" }} onClick={() => document.getElementById('tooltip-message-profile').style.display = 'block'}
                onMouseLeave={() => document.getElementById('tooltip-message-profile').style.display = 'none'}
                className="profile-dropdown-two">
                <h3>Manage Activity</h3>
                <p>Liked Posts</p>
                <div id="tooltip-message-profile" className="tooltip-message-profile">My activity feature coming soon</div>
              


              </div>

              <div className="profile-dropdown-three">
                <button onClick={handleLogout} >Log Out</button>

              </div>
            </>

          </div>
        ) : (
          <></>
        )}
      </ul>

    </div>
  );
}

export default ProfileButton;

