import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostDisplay from "../PostCard/SinglePostDisplay";
import { getUserCommentsThunk, getUserLikesThunk, getUserThunk } from "../../store/user";
import EditProfile from "./EditProfile";
import OpenModalButton from '../OpenModalButton';
import DeleteProfile from "./DeleteUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './UserProfile.css'


const UserProfile = () => {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const allUser = Object.values(useSelector(state => state.user.allUser))
    // const comments = Object.values(useSelector(state => state.comment.allComments));
    // const commentsWithPosts = useSelector((state) => state.user.userActivity.comments_with_posts);
    // const likesForPosts = Object.values(useSelector(state => state.user.userActivity));
    // const likes = Object.values(useSelector(state => state.likes.allLikes))

    const currentUserFollowingIds = user.following.map(followedUser => followedUser.id);
    const usersNotFollowed = allUser.filter(usr => !currentUserFollowingIds.includes(usr.id) && usr.id !== user.id);
    
    const usersToDisplay = shuffleArray(usersNotFollowed).slice(0, 3);
    useEffect(() => {
        dispatch(getUserCommentsThunk())
        dispatch(getUserThunk())
    }, [dispatch])

    const handleProfilePage = (userId) => {
        history.push(`/user/${userId}`);
    };


    return (
        <div className="profile-page">
            <div className="first-section-user">
                <div className="background-image-user">
                    <div className="edit-delete-user">
                        <OpenModalButton modalComponent={<EditProfile userId={user.id} />}>
                            <span className="material-symbols-outlined">edit</span>
                        </OpenModalButton>
                    </div>
                </div>
                <div className="user-information">
                    <img src={user.profile_image} />
                    <div className="user-name-occupation">
                    <h2>
                        {user.first_name}{user.last_name}
                    </h2>
                    <p>{user.occupation}</p>
                    </div>
                    <p>{user.city}, {user.state}</p>
                    <p>{user.biography}</p>
                </div>
            </div>


            <div className="second-section">
                    <h2>Suggested connections for you</h2>
                <div className="second-section-content">
                    {usersToDisplay.map((user) => (
                        <div key={user.id} onClick={() => handleProfilePage(user.id)}>
                            <img
                                src={user.profile_image}
                                
                            />
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default UserProfile;