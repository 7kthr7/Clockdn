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
                <span className="material-symbols-outlined">image</span>
                <span className="material-symbols-outlined">edit</span>
            </div>
    
            <div className="content-row">
                <div className="left-section">
                    <h3>User Profile</h3>
                </div>
                <div className="center-feed">
                    <PostFeed />
                </div>
                <div className="right-section">
                <h3>News Article</h3>
                </div>
            </div>
        </div>
    );
    

}

export default HomePage