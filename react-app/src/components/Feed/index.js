import React from "react"
import CreatePost from "../Post/CreatePost"
import OpenModalButton from '../OpenModalButton'
import './style.css'
import PostFeed from "../PostCard"



const HomePage = () => {


    return (
        <div id="home-page">
            <div className="start-post-wrapper">
                <div className="start-post-button">
                    <OpenModalButton
                        buttonText="Start A Post"
                        modalComponent={<CreatePost />}

                    />
                </div>
            </div>
            <PostFeed />
        </div>
    )
}

export default HomePage