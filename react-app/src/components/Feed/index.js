import React from "react"
import { useSelector } from "react-redux"
import CreatePost from "../Post/CreatePost"
import OpenModalButton from '../OpenModalButton'
import './style.css'
import PostFeed from "../PostCard"

const HomePage = () => {
    const user = useSelector(state => state.session.user);





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
                        />
                    </div>
                    <div className="left-profile-image">
                        <img
                            src={user.profile_image}
                        />
                    </div>
                    <h3>{user.first_name}{user.last_name}</h3>
                    <p>{user.occupation}</p>
                </div>
                <div className="left-section-middle">
                    <h3>TO-DO</h3>
                </div>
            </div>
        

            <div className="center-feed">
                <PostFeed />
            </div>
                      
            <div className="right-section">
                <div className="news-articles">
                    <h3>Clockdn News</h3>
                    <li >
                    <a href="https://blog.appacademy.io/best-programming-languages-for-game-development/" target="_blank" rel="noopener noreferrer">5 Best Programming Languages for Game Development</a>
                    </li>
                    <li>
                    <a href="https://blog.appacademy.io/what-is-javascript-used-for/" target="_blank" rel="noopener noreferrer">What Can You Do With JavaScript? 7 JavaScript Applications</a>
                    </li>
                    <li>
                    <a href="https://blog.appacademy.io/best-programming-languages-for-ai-development/" target="_blank" rel="noopener noreferrer">6 Best Programming Languages for AI Development</a>
                    </li>
                    <li>
                    <a href="https://blog.appacademy.io/what-is-python-used-for/" target="_blank" rel="noopener noreferrer">What is Python Used For? 9 Applications & Examples</a>
                    </li>
                    <li>
                    <a href="https://blog.appacademy.io/famous-black-coders-and-software-engineers/" target="_blank" rel="noopener noreferrer">6 Black Software Engineers Who Are Changing the World</a>
                    </li>
                </div>
                <div className="right-section-two">
                    <h3> SECTION TWO </h3>
                </div>
            </div>
        </div>
    );


}

export default HomePage