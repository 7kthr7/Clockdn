import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../store/post";
import CreatePost from "./CreatePost";
// import EditPost from "./EditPost";
import PostCard from "../PostCard";
import OpenModalButton from "../OpenModalButton";

import './Allposts.css'
// import DeletePost from "./DeletePost";


const FeedPosts = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector((state) => state.post.allPosts))
 
    return (
        <div>
          
                <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePost />}
                />

                {posts.reverse().map((post) => (
                    <div key={post.id} >
                    
                    </div>
                ))}
            
        </div>
    );
};

export default FeedPosts;