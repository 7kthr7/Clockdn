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
                {/* <div>
                <span className="material-symbols-outlined">image</span>
                </div> */}
                </div>
            
    
            <div className="content-row">
                <div className="left-section">
                    
                    
                <div className="left-section-top">
                    <div id="left-background-image">
                    <img 
                    
                    // alt="Background Image"
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
                </div>
                </div>
                    
                    
                    
                    <div className="left-section-middle">


                    </div>
                
                
                
                
               







                <div className="center-feed">
                    <PostFeed />
                </div>



                <div className="right-section">
                    
                    
                    <div className="news-articles">
                <h3>Clockdn News</h3>
                <li>
                    New's link One
                </li>
                <li>
                    New's Link two
                </li>
                <li>
                    New's Link three
                </li>
                <li>
                    New's Link four
                </li>
                <li>
                    New's Link five
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