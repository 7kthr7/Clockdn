// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLikesThunk, createLikeThunk, deleteLikeThunk } from "../../store/likes";
// import './style.css'

// const LikeToggle = ({ postId }) => {
//     const dispatch = useDispatch();
//     const likes = Object.values(useSelector(state => state.likes.allLikes));
//     const currentUser = useSelector(state => state.session.user);

//     // Check if the user has already liked this post
//     const userLiked = likes.some(like => like.post_id === postId && like.user_id === currentUser.id);

//     // Local state to track if the post is liked by the user
//     const [isLiked, setIsLiked] = useState(userLiked);

//     const toggleLike = async () => {
//         if (isLiked) {
//             await dispatch(deleteLikeThunk(postId));
//         } else {
//             await dispatch(createLikeThunk(postId));
//         }
//         dispatch(getLikesThunk())
        
//         // Toggle the state after action is dispatched
//         setIsLiked(!isLiked);
//     }

//     return (
//         <div>
//             <span 
//                 className={`material-symbols-sharp ${isLiked ? 'liked' : 'not-liked'}`} 
//                 onClick={toggleLike}>
//                 favorite
//             </span>
       
//         </div>
//     )
    
//     }
// export default LikeToggle;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesThunk, createLikeThunk, deleteLikeThunk } from "../../store/likes";
import './style.css';

const LikeToggle = ({ postId }) => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state.likes.allLikes));
    const currentUser = useSelector(state => state.session.user);
    const [isLiked, setIsLiked] = useState(likes.some(like => like.post_id === postId && like.user_id === currentUser.id));
    const [showModal, setShowModal] = useState(false);

    const toggleLike = async () => {
        if (isLiked) {
            await dispatch(deleteLikeThunk(postId));
        } else {
            await dispatch(createLikeThunk(postId));
        }
        dispatch(getLikesThunk());
        setIsLiked(!isLiked);
    };

    return (
        <div>
            <span 
                className={`material-symbols-sharp ${isLiked ? 'liked' : 'not-liked'}`} 
                onClick={toggleLike}>
                favorite
            </span>
            <LikeMessage postId={postId} likes={likes} onClick={() => setShowModal(true)} />

            {showModal && <LikesModal postId={postId} likes={likes} onClose={() => setShowModal(false)} />}
        </div>
    );
}

const LikeMessage = ({ postId, likes, onClick }) => {
    const likers = likes.filter(like => like.post_id === postId);
    
    if (!likers.length) return null;
    
    if (likers.length === 1) {
        const [onlyLiker] = likers;
        return <p onClick={onClick}>{onlyLiker.first_name} {onlyLiker.last_name} liked this post</p>;
    }

    const [firstLiker] = likers;
    return <p onClick={onClick}>{firstLiker.first_name} {firstLiker.last_name} and others liked this post</p>;
};

const LikesModal = ({ postId, likes, onClose }) => {
    const likers = likes.filter(like => like.post_id === postId);
    
    return (
        <div className="likes-modal">
            {likers.map(liker => (
                <div key={liker.id}>
                    <img src={liker.profile_image} alt={`${liker.first_name} ${liker.last_name}`} />
                    <p>{liker.first_name} {liker.last_name}</p>
                </div>
            ))}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default LikeToggle;
