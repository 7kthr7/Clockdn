import React from "react"
import CreatePost from "../Post/CreatePost"
import PostCard from "../PostCard"
import OpenModalButton from '../OpenModalButton'
import  './style.css'



const HomePage = () => { 


return (
    <div id="home-page" style={{ border: "10px solid black" }}>
        <div className="start-post-wrapper">
        <div className="start-post-button">
          <OpenModalButton
                    buttonText="Start A Post"
                    modalComponent={<CreatePost />}
                    
                />
                </div>
                </div>





        <PostCard/>
    </div>
)
}

export default HomePage