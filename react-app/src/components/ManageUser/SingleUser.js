import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserThunk } from '../../store/user'

const ViewUserProfile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);


    const user = useSelector((state) => state.user.singleUser);

    useEffect(() => {
        setLoading(true);  // Start loading
        async function fetchUserData() {
            await dispatch(getSingleUserThunk(userId));
            setLoading(false);  // End loading once data is fetched
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
        <div>
            <div>
                <img src={user.profile_image} style={{ width: "40px", height: "50px" }} />
            </div>
            <div>{user.first_name} {user.last_name}</div>
            <div>{user.occupation}</div>
            <div>{user.city}, {user.state}</div>
            <div>{user.biography}</div>
        </div>
    );
};

export default ViewUserProfile;
