import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk, unfollowUserThunk } from '../../store/user';

const ToggleConnection = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const isInitiallyFollowing = user.following.some(followingUser => followingUser.id === userId);

    const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);

    const handleToggleFollow = async () => {
        setIsFollowing(prevState => !prevState);

        if(isFollowing) {
            dispatch(unfollowUserThunk(userId));
        } else {
            dispatch(followUserThunk(userId));
        }
        setIsFollowing(!isFollowing)
    };

    return (
        <div>
            <button 
                onClick={handleToggleFollow}
                style={{
                    position: 'relative',
                    // marginLeft: '500px',
                    marginTop: '18px',
                    width: '150px',
                    border: '.5px solid #44795f ',
                    borderRadius: '4px',
                    backgroundColor: isFollowing ? 'white' : '#2c684bc4',
                    borderColor: '#44795f',
                    transition: 'background-color 0.1s ease-in',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px'
                }}
            >
                {isFollowing ? "disconnect" : "Connect"}
            </button>
        </div>
    );
}

export default ToggleConnection;
