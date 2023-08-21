import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getUserThunk } from "../../store/user"
import CreatePost from "../Post/CreatePost"
import OpenModalButton from '../OpenModalButton'
import './style.css'
import PostFeed from "../PostCard"
import Background from '../../assets/background.jpg'
import GitHubLogo from '../../assets/github.png'
import Linkdn from '../../assets/linkedinlogo.png'



const HomePage = () => {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }


    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector(state => state.session.user);
    const allUser = Object.values(useSelector(state => state.user.allUser))
    const currentUserFollowingIds = user.following.map(followedUser => followedUser.id);
    const usersNotFollowed = allUser.filter(usr => !currentUserFollowingIds.includes(usr.id) && usr.id !== user.id);
    
    const usersToDisplay = shuffleArray(usersNotFollowed).slice(0, 3);

    useEffect(() => {
        // dispatch(getUserCommentsThunk())
        dispatch(getUserThunk())
    }, [dispatch])


const handleOnClick = (e) => {
    e.preventDefault()
    history.push('/profile')
}

const handleProfilePage = (userId) => {
    history.push(`/user/${userId}`);
};
const handleConnectionPage = () => {
    history.push(`/connections`);
};


    return (
        <div id="home-page">
            <div className="start-post-wrapper">
                <div className="start-post-image">
                    <img src={user.profile_image} alt="Profile" />
                </div>
                <div className="start-post-button">
                    <OpenModalButton
                        buttonText="Start a post"
                        modalComponent={<CreatePost />}
                    />
                </div>
                <div id="pencil-icon">
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className="left-section">
                <div className="left-section-top">
                    <div id="left-background-image">
                    <img
                            src={Background}
                        />
                    </div>
                    <div className="left-profile-image">
                        <img
                            onClick={handleOnClick}
                            src={user.profile_image}
                        />
                    </div>
                    <div className="left-user-info" onClick={handleOnClick}>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <p>{user.occupation}</p>
                    </div>
                </div>
                <div className="left-section-middle">
                    <p onClick={handleConnectionPage} style={{ cursor:"pointer" }}>My Connections</p>
                    <p   style={{ cursor:"pointer" }} onClick={() => document.getElementById('tooltip-message-activity').style.display = 'block'}
   onMouseLeave={() => document.getElementById('tooltip-message-activity').style.display = 'none'} 
>My activity</p>
<div id="tooltip-message-activity" className="tooltip-message-activity">My activity feature coming soon</div>

                </div>
                <div className="left-bottom-section">
                    <p>Python | Flask-SQLAlchemy | PostgresSQL | React-Redux | AWS | HTML | CSS</p>
                    <p>Connect with Clockdn developer on LinkedIn and GitHub </p>


                    <a href="https://www.linkedin.com/in/kawthar-mohamud/" target="_blank" rel="noopener noreferrer">
                        <img src={Linkdn} alt="LinkedIn Logo" style={{ width: "20px", height: "20px", marginTop: "-50px" }} />
                    </a>
                    <a href="https://github.com/7kthr7/Clockdn" target="_blank" rel="noopener noreferrer">
                        <img src={GitHubLogo} alt="GitHub Logo"
                            style={{ width: "30px", height: "30px", marginBottom: "-6px" }} />
                    </a>
                </div>
            </div>
        

            <div className="center-feed">
                <PostFeed />
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
                <div className="right-section-two">
                    <h3> Make Connections </h3>
                   
                    {usersToDisplay.map((user) => (
                        <div key={user.id} className="right-section-two-content" onClick={() => handleProfilePage(user.id)}>
                            <img
                                src={user.profile_image}
                                
                            />
                            <div className="right-user-info"> 
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p>{user.occupation}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>

        </div>
    );


}

export default HomePage