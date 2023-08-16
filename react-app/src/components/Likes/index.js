import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesThunk, createLikeThunk, deleteLikeThunk } from "../../store/likes";

const LikeToggle = ({ postId }) => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state.likes.allLikes));
    const currentUser = useSelector(state => state.session.user);

    // Check if the user has already liked this post
    const userLiked = likes.some(like => like.post_id === postId && like.user_id === currentUser.id);

    // Local state to track if the post is liked by the user
    const [isLiked, setIsLiked] = useState(userLiked);

    const toggleLike = async () => {
        if (isLiked) {
            await dispatch(deleteLikeThunk(postId));
        } else {
            await dispatch(createLikeThunk(postId));
        }
        dispatch(getLikesThunk())
        
        // Toggle the state after action is dispatched
        setIsLiked(!isLiked);
    }

    return (
        <div>
            <button 
                onClick={toggleLike} 
                style={{backgroundColor: isLiked ? 'green' : 'red'}}>
                {isLiked ? "Unlike" : "Like"}
            </button>
        </div>
    )
}

export default LikeToggle;
