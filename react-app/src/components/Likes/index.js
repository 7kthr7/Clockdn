import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../store/post";
import { getLikesThunk, createLikeThunk, deleteLikeThunk } from "../../store/likes";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";

import './style.css';

const LikeToggle = ({ postId }) => {
    const dispatch = useDispatch();
    const likesArr = Object.values(useSelector((state) => state.likes.allLikes));
    const sessionUser = useSelector(state => state.session.user);
    const userLiked = likesArr.some(like => like.post_id === postId && like.user_id === sessionUser.id);

    const LikeUnlike = async () => {
        if (userLiked) {
            await dispatch(deleteLikeThunk(postId));
        } if (!userLiked) {
            await dispatch(createLikeThunk(postId));
        }
        dispatch(getLikesThunk(postId));
        // console.log ("IS THIS DISPATCHING", dispatch(getLikesThunk(postId)));
    };

    return (
        <>
            <div class="like-toggle-button">
                <span className={`material-symbols-sharp ${userLiked ? 'liked' : 'not-liked'}`} onClick={LikeUnlike}>
                    favorite
                </span>


                <div className="view-likes-button">
                    <OpenModalButton
                        buttonText={<ViewLikes postId={postId} likesArr={likesArr} />}
                        modalComponent={<LikesModal postId={postId} likesArr={likesArr} />}
                    />
                </div>
            </div>

        </>
    );
}


const ViewLikes = ({ postId, likesArr, onClick }) => {
    const allLikes = likesArr.filter(like => like.post_id === postId);

    if (!allLikes.length) {
        return <span style={{ cursor: 'default', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>Be the first to like 💚</span>;
    }

    if (allLikes.length === 1) {
        const oneLike = allLikes[0];
        return <span onClick={onClick}>{oneLike.first_name} {oneLike.last_name} liked this post</span>;
    }

    const firstLike = allLikes[0];
    const likeCount = allLikes.length - 1
    return <span onClick={onClick}> Liked by {firstLike.first_name} {firstLike.last_name} and {likeCount} others</span>;
};


const LikesModal = ({ postId, likesArr }) => {
    const allLikes = likesArr.filter(like => like.post_id === postId);
    const history = useHistory()
    const { closeModal } = useModal();


    const handleProfilePage = (userId) => {
        closeModal();

        history.push(`/user/${userId}`);
    };


    return (
        <div className="likes-modal">
            {allLikes.map(liker => (
                <div className="user-liked" key={liker.id}>
                    <div onClick={() => handleProfilePage(liker.user_id)} className="liked-modal-user">
                        <img src={liker.profile_image}
                        />
                        <div className="liked-user-occupation">
                            <h3>{liker.first_name} {liker.last_name}</h3 >
                            <p>{liker.occupation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default LikeToggle;
