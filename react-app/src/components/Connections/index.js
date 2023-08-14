// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { followUserThunk, unfollowUserThunk } from '../../store/user';

// const ToggleConnection = ({ userId }) => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.session.user);

//     const [errorMsg, setErrorMsg] = useState("");
//     const [isFollowing, setIsFollowing] = useState(false);

//     const handleToggleFollow = async () => {

//         setErrorMsg("");

//         if (user.id === userId) {
//             setErrorMsg("You can't follow/unfollow yourself!");
//             return;
//         }

//         try {
//             let result;
//             if (isFollowing) {
//                 result = await dispatch(unfollowUserThunk(userId));
//             } else {
//                 result = await dispatch(followUserThunk(userId));
//             }


//             if (result && !result.errors) {
//                 setIsFollowing(!isFollowing);
//             } else if (result.errors) {
//                 setErrorMsg(result.errors);
//             }

//         } catch (error) {
//             const message = isFollowing ? 
//                 "Error unfollowing this user" : 
//                 "Error following this user";
//             setErrorMsg(message);
//         }
//     };

//     return (
//         <div>
//             <button 
//                 onClick={handleToggleFollow}
//                 style={{
//                     backgroundColor: isFollowing ? "red" : "green", 
//                 }}
//             >
//                 {isFollowing ? "Unfollow" : "Follow"}
//             </button>
//             {errorMsg && <p className="error-message">{errorMsg}</p>}
//         </div>
//     );
// }

// export default ToggleConnection;
