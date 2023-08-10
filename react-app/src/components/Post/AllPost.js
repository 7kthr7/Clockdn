import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../store/post";
import OpenModalButton from "../OpenModalButton";
import CreatePost from "./CreatePost";
import './Allposts.css'


const FeedPosts = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector((state) => state.post.posts))

    useEffect(() => {
        dispatch(getPostsThunk())
    },[dispatch] )


    return (
        <div>
            <h3> CLOCKDN FEED
            <OpenModalButton
                            
                            buttonText="Start a post"
                            modalComponent={<CreatePost />}
                        />
            {posts.map((post) => (
                <div key={post.id} className="single-post">
                    {post.title}
                    {post.body}
                    <img
                  src={post.post_images}
                  alt={post.post_images}
                  style={{ width: "400px", height: "400px", marginBottom: "2px", marginLeft: '5px', marginTop:'10px' }}
                />
                </div>
                
            ))}
            </h3>

        </div>
    )
}

export default FeedPosts