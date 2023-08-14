// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { followUserThunk } from '../../store/user';

// const CreateConnection = ({ userId }) => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.session.user);

//     const [errorMsg, setErrorMsg] = useState("");

//     const handleFollow = async () => {
//         // Clear previous errors
//         setErrorMsg("");

//         // Check if the user is trying to follow themselves
//         if (user.id === userId) {
//             setErrorMsg("You can't follow yourself!");
//             return;
//         }

//         try {
//             const result = await dispatch(followUserThunk(userId));
            
//             // Handle the result further if necessary
//             if (result.errors) {
//                 setErrorMsg(result.errors);
//             } else {
//                 // Maybe set a success message or handle other UI updates
//             }

//         } catch (error) {
//             setErrorMsg("You are already following this user");
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleFollow}>Follow</button>
//             {errorMsg && <p className="error-message">{errorMsg}</p>}
//         </div>
//     );
// }

// export default CreateConnection;
