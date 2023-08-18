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
            
            {/* <div className="start-post-wrapper">
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
                </div> */}
                {/* <div>
                <span className="material-symbols-outlined">image</span>
                </div> */}
            
    
            {/* <div className="content-row">
                <div className="left-section">
                    
                    
                    <div className="left-section-top">
                        <div id="left-background-image">
                    <img 
                    
                    alt="Background Image"
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
                     */}
                    
{/*                     
                    <div className="left-section-middle">


                    </div>
                
                
                
                
                </div> */}







                <div className="center-feed">
                    <PostFeed />
                </div>
                {/* <div className="right-section">
                <h3>News Article</h3>
                </div>
            </div> */}
        </div>
    );
    

}

export default HomePage