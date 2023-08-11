import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../store/post";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import OpenModalButton from "../OpenModalButton";

import './Allposts.css'


const FeedPosts = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const currentUser = useSelector((state) => state.session.user)
    const [editPostId, setEditPostId] = useState(null);


    useEffect(() => {
        dispatch(getPostsThunk());
    }, [dispatch]);


    const handleEditClick = (postId) => {
        setEditPostId(postId);
    };

    const handleCloseEdit = () => {
        setEditPostId(null);
    };

    return (
        <div>
            <h3> CLOCKDN FEED
                <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePost />}
                />

                {posts.reverse().map((post) => (
                    <div key={post.id} className="single-post">
                        {post.title}
                        {post.body}
                        <img
                            src={post.post_images}
                            style={{ width: "400px", height: "400px", marginBottom: "2px", marginLeft: '5px', marginTop: '10px' }}
                        />
                        {currentUser && currentUser.id === post.user_id && (
                            <button onClick={() => handleEditClick(post.id)}>Edit</button>
                        )}
                        {editPostId === post.id && (
                            <EditPost post={post} onClose={handleCloseEdit} />
                        )}
                    </div>
                ))}
            </h3>
        </div>
    );
};

export default FeedPosts;