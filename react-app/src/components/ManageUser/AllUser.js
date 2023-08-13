import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../store/user";
import EditUser from "./EditProfile";
import OpenModalButton from '../OpenModalButton'
import { Link } from "react-router-dom"


// to eventually search for all users


const AllUser = () => {
    const dispatch = useDispatch();
    const allUsers = Object.values(useSelector((state) => state.user.allUser));  
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>ALL USERS</h1>
            {allUsers.map((user) => (
                    <div key={user.id}>

        
                    <img
                        src={user.profile_image}
                        alt={user.first_name}
                        style={{ width: "50px", height: "50px" }}
                    />
                    <p>{user.first_name}</p>
                    
                    </div>
            ))}
        </div>
    );
}
export default AllUser