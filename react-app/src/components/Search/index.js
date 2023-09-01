import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserThunk } from "../../store/user";
import './style.css'

export default function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.allUser);
    const [searchUser, setSearchUser] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const [userClicked, setUserClicked] = useState(false);
    const [showMenu, setShowMenu] = useState(false); 
    const searchRef = useRef(null); 

    useEffect(() => {
        dispatch(getUserThunk());
      }, [dispatch]);
    
      const handleSearch = () => {
        if (searchUser) {
          const userMatch = Object.values(users).find(
            (users) =>
              users.first_name.toLowerCase() === searchUser.toLowerCase()
          );
          if (userMatch) {
            setSearchUser("");
            setFilteredUser([]);
            setUserClicked(false);
    
          }
        }
      };
      const closeMenu = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      useEffect(() => {
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, []);

      const handleInputClick = () => {
        setShowMenu(true);
        if (searchRef.current) {
          searchRef.current.focus();
        }
      };

      const handleUserClick = (userId) => {
        setUserClicked(true);
    
        history.push(`/user/${userId}`);
      };
    
      useEffect(() => {
        if (!userClicked) {
          if (searchUser === "") {
            setFilteredUser([]);
          } else {
            const filtered = Object.values(users).filter((users) =>
              users.first_name.toLowerCase().includes(searchUser.toLowerCase())
            );
            setFilteredUser(filtered.slice(0, 10));
          }
        }
      }, [searchUser, users, userClicked]);
    
      return (
        <div id="search-bar">
          {showMenu && searchUser !== "" && !userClicked && (
            <div className="search-suggestions">
              {filteredUser.map((users) => (
                <div
                  key={users.id}
                  onClick={() => handleUserClick(users.id)}
                className="search-suggestion"
                >
                  <div key={users.id} users={users} />
                  <img src={users.profile_image} style={{ width: "30px", height: "30px", borderRadius:"100%", marginRight: "20px", objectFit: "cover" }}> 
                  
                  </img>
                  <p>
                  {users.first_name} {users.last_name}
                    </p> 

                  </div>
                  
               
              ))}
              
            </div>
          )}
    <div >
          <div className="search-input-container">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              ref={searchRef}
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Search Connections"
              onClick={handleInputClick}
              className="search-input"
            >
              </input>
              </div>
    
          </div>
        </div>
      );
    
    
    
    

}