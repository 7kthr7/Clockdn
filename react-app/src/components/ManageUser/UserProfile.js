import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostDisplay from "../PostCard/SinglePostDisplay";
import { getUserCommentsThunk, getUserLikesThunk, getUserThunk } from "../../store/user";
import EditProfile from "./EditProfile";
import OpenModalButton from '../OpenModalButton';
import DeleteProfile from "./DeleteUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Background from '../../assets/background.jpg'

import './SingleUser.css'


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

    const usersToDisplay = shuffleArray(usersNotFollowed).slice(0, 5);
    useEffect(() => {
        dispatch(getUserCommentsThunk())
        dispatch(getUserThunk())
    }, [dispatch])

    const handleProfilePage = (userId) => {
        history.push(`/user/${userId}`);
    };

    <div className="edit-delete-user">
        <OpenModalButton modalComponent={<EditProfile userId={user.id} />}>
            <span className="material-symbols-outlined">edit</span>
        </OpenModalButton>


    </div>
    return (
        <div className="single-profile-page">

            <div className="single-user-left-section">
                <div className="single-first-section-user">
                    <div className="single-background-image-user">
                        <img
                            src={Background}
                        />
                    </div>
                   
                    <div className="single-user-information">
                        <img src={user.profile_image} />
                        <div className="single-user-name-occupation">
                            <h2>
                                {user.first_name} {user.last_name}
                                <OpenModalButton modalComponent={<EditProfile userId={user.id} />}>
                            <span className="material-symbols-outlined">edit</span>
                        </OpenModalButton>
                            </h2>
                            <p>{user.occupation}</p>
                        </div>
                        <p className="single-user-location">{user.city}, {user.state}</p>
                    </div>
                </div>

                <div className="single-third-section">
                    <h3>About</h3>
                    <p className="single-user-biography" >{user.biography}</p>

                </div>
                <div className="single-second-section">
                    <h2>People you may know</h2>
                    <div className="single-second-section-content">
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
            <div className="single-user-right-section">
                <div className="right-section">
                    <div className="news-articles">
                        <h3>Clockdn News</h3>

                        <a href="https://blog.appacademy.io/best-programming-languages-for-game-development/" target="_blank" rel="noopener noreferrer">5 Best Programming Languages for Game Development</a>

                        <a href="https://blog.appacademy.io/what-is-javascript-used-for/" target="_blank" rel="noopener noreferrer">What Can You Do With JavaScript? 7 JavaScript Applications</a>

                        <a href="https://blog.appacademy.io/best-programming-languages-for-ai-development/" target="_blank" rel="noopener noreferrer">6 Best Programming Languages for AI Development</a>


                        <a href="https://blog.appacademy.io/what-is-python-used-for/" target="_blank" rel="noopener noreferrer">What is Python Used For? 9 Applications & Examples</a>


                        <a href="https://blog.appacademy.io/famous-black-coders-and-software-engineers/" target="_blank" rel="noopener noreferrer">6 Black Software Engineers Who Are Changing the World</a>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;