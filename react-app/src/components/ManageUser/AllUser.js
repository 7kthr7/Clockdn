import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../store/user";


const AllUser = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.allUser.users);  // Access users correctly

    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>ALL USERS</h1>
            {users && users.map(user => (
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