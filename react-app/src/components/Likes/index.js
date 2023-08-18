import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesThunk, createLikeThunk, deleteLikeThunk } from "../../store/likes";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import './style.css';

const LikeToggle = ({ postId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const likesArr = Object.values(useSelector(state => state.likes.allLikes));
    const sessionUser = useSelector(state => state.session.user);
    const userLiked = likesArr.some(like => like.post_id === postId && like.userId === sessionUser.id);
    const [liked, setLiked] = useState(userLiked);
    const [showLikes, setShowLikes] = useState(false);

    // useEffect(() => {
    //     dispatch(getLikesThunk());
    // }, [dispatch]);


    const LikeUnlike = async () => {
        if (liked) {
            await dispatch(deleteLikeThunk(postId));
        } else {
            await dispatch(createLikeThunk(postId));
        }
        dispatch(getLikesThunk())
        setLiked(!liked);   // toggle the liked state
    };

    return (
        <div class="like-toggle-button">
            <span className={`material-symbols-sharp ${liked ? 'liked' : 'not-liked'}`} onClick={LikeUnlike}> 
                favorite
            </span>
            {/* <ViewLikes postId={postId} likesArr={likesArr} onClick={() => setShowLikes(true)} />
            {showLikes && <LikesModal postId={postId} likesArr={likesArr} onClose={() => setShowLikes(false)} />} */}
            <div className="view-likes-button">
            <OpenModalButton 
                buttonText={<ViewLikes postId={postId} likesArr={likesArr} />} 
                modalComponent={<LikesModal postId={postId} likesArr={likesArr} />}
            />
            </div>
        </div>
    );
}


    const ViewLikes = ({ postId, likesArr, onClick }) => {
        const allLikes = likesArr.filter(like => like.post_id === postId);

        if (!allLikes.length) return "Be the first to like 💚";

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

        return (
            <div>
                {allLikes.map(liker => (
                    <div key={liker.id}>
                        <img src={liker.profile_image}
                        style={{ width: "100px", height: "100px" }}
                        />
                        <p>{liker.first_name} {liker.last_name}</p>
                        <p>{liker.occupation}</p>
                    </div>
                ))}
            </div>
        );
    };

    

export default LikeToggle;
