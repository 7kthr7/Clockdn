import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserConnectionsThunk, getUserThunk } from '../../store/user'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './style.css'
import ToggleConnection from ".";
const Connections = () => {

const { userId } = useParams();
const dispatch = useDispatch();
// const [loading, setLoading] = useState(true);
const history = useHistory()

const user = useSelector(state => state.session.user);
const followers = user.following.map(follower => follower);
console.log("First Names of Followers:", followers);




useEffect(() => {
    // setLoading(true);
    async function fetchUserData() {
        await dispatch(getUserThunk());
        dispatch(getUserConnectionsThunk(userId));
    }
    fetchUserData();
}, [dispatch, userId, followers]);




const handleProfilePage = (userId) => {
    history.push(`/user/${userId}`);
};


return (
    <div className="connections-page">
        <div className="left-section-connections">
        <h2>My Connections</h2>
            {followers.map((userr) => (
                <div className="followings-list" key={userr.id} >
                    {/* <ToggleConnection/> */}
                    <div className="img-user-info">
                    <img
                        src={userr.profile_image}
                        />
                    <div className="followers-info"  onClick={() => handleProfilePage(userr.id)}>
                    <h3>{userr.first_name} {userr.last_name}</h3>
                    <p>{userr.occupation}</p>
                    <p>{user.city}, {user.state}</p>
                    </div>
                    </div>
               
                    </div>
            ))}
        </div>
        <div className="right-section">
            <div className="news-articles">
                <h3>Clockdn News</h3>
                <a href="https://blog.appacademy.io/best-programming-languages-for-game-development/" target="_blank" rel="noopener noreferrer">5 Best Programming Languages for Game Development</a>                
                <a href="https://blog.appacademy.io/what-is-javascript-used-for/" target="_blank" rel="noopener noreferrer">What Can You Do With JavaScript? 7 JavaScript Applications</a>              
                <a href="https://blog.appacademy.io/best-programming-languages-for-ai-development/" target="_blank" rel="noopener noreferrer">6 Best Programming Languages for AI Development</a>           
                <a href="https://blog.appacademy.io/what-is-python-used-for/" target="_blank" rel="noopener noreferrer">What is Python Used For? 9 Applications & Examples</a>
                <a href="https://blog.appacademy.io/famous-black-coders-and-software-engineers/" target="_blank" rel="noopener noreferrer">6 Black Software Engineers Who Are Changing the World</a>           
            </div>
        </div>
    </div>

    
);
};

export default Connections