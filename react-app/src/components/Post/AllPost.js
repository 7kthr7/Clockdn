import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../store/post";
import CreatePost from "./CreatePost";
// import EditPost from "./EditPost";
import OpenModalButton from "../OpenModalButton";

import './Allposts.css'
// import DeletePost from "./DeletePost";


const FeedPosts = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const currentUser = useSelector((state) => state.session.user)
    // const [editPostId, setEditPostId] = useState(null);
    // const [deletePostId, setDeletePostId] = useState(null);


    useEffect(() => {
        dispatch(getPostsThunk());
    }, [dispatch]);


    // const handleEditClick = (postId) => {
    //     setEditPostId(postId);
    // };

    // const handleCloseEdit = () => {
    //     setEditPostId(null);
    // };
    // const handleDeleteClick = (postId) => {
    //     setDeletePostId(postId);
    // };

    // const handleCloseDelete = () => {
    //     setDeletePostId(null);
    // };

    return (
        <div>
            <h3> CLOCKDN FEED
                <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePost />}
                />

                {posts.reverse().map((post) => (
                    <div key={post.id} className="single-post">
                       <div  style={{ border: "2px solid purple"}} >{post.title}</div> 

                       <div  style={{ border: "2px solid blue"}} >{post.body}</div> 
                        <img
                            src={post.post_images}
                            alt={post.post_images}
                            style={{ width: "200px", height: "200px", marginBottom: "2px", marginLeft: '5px', marginTop: '10px' }}
                        />
                        <div>
                        {/* {currentUser && currentUser.id === post.user_id && (
                            <button onClick={() => handleEditClick(post.id)}>Edit</button>
                        )}
                        {editPostId === post.id && (
                            <EditPost post={post} onClose={handleCloseEdit} />
                        )} */}
                        </div>
                        
                         {/* {currentUser && currentUser.id === post.user_id && (
                            <button onClick={() => handleDeleteClick(post.id)}>Delete</button>
                        )}
                        {deletePostId === post.id && (
                            <DeletePost post={post} onClose={handleCloseDelete} />
                        )} */}
                    </div>
                ))}
            </h3>
        </div>
    );
};

export default FeedPosts;