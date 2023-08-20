import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserThunk } from '../../store/user'
import Background from '../../assets/download.jpg'
import './SingleUser.css'

// import ToggleConnection from "../Connections";


const ViewUserProfile = () => {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }


    const { userId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // const sessionUser = useSelector(state => state.session.user)
    const user = useSelector((state) => state.user.singleUser);
    const userArray = Object.values(user);
    
    let currentUserFollowingIds = [];
    let usersNotFollowed = [];
    
    if (userArray && userArray.following) {
        currentUserFollowingIds = userArray.following.map(followedUser => followedUser.id);
        usersNotFollowed = userArray.filter(usr => currentUserFollowingIds.includes(usr.id) && usr.id !== user.id);
    }
    
    const usersToDisplay = shuffleArray(usersNotFollowed).slice(0, 3);
    
    

    useEffect(() => {
        setLoading(true);
        async function fetchUserData() {
            await dispatch(getSingleUserThunk(userId));
            setLoading(false);
        }
        fetchUserData();
    }, [dispatch, userId]);

    // useEffect(() => {
    //     dispatch(getSingleUserThunk(userId));
    // }, [dispatch, userId]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

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
                            </h2>
                            <p>{user.occupation}</p>
                        </div>
                            <p className="single-user-biography" >{user.biography}</p>
                            <p className="single-user-location">{user.city}, {user.state}</p>
                    </div>
                </div>

                <div className="single-second-section">
                        <h2>Recent Follows</h2>
                    <div className="single-second-section-content">
                        {usersToDisplay.map((userr) => (
                            <div key={userr.id} >
                                {/* <img
                                    src={user.profile_image}
                                    
                                /> */}
                                <p>{userr.first_name} {userr.last_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="single-third-section">
                    <h3>Recent Posts</h3>
                    <p>Coming soon...</p>

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

export default ViewUserProfile;
