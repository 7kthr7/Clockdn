import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserThunk, getUserConnectionsThunk } from '../../store/user';

import { followUserThunk, unfollowUserThunk } from '../../store/user';
import './style.css';

const ToggleConnection = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const users = useSelector(state => state.user.singleUser);
    const isFollowed = users.followers.some(followingUser => followingUser.id === user.id);


    const handleToggleFollow = async () => {
        if(isFollowed) {
           await  dispatch(unfollowUserThunk(userId));
        } if(!isFollowed) {
          await   dispatch(followUserThunk(userId));
        }
         dispatch(getSingleUserThunk(userId));
  
    }

    return (
        <div>
<button 
    onClick={handleToggleFollow}
    className={`followToggleButton ${isFollowed ? 'following' : 'not-following'}`}
>
    {isFollowed ? "Disconnect" : "Connect"}
</button>
        </div>
    );
}

export default ToggleConnection;
