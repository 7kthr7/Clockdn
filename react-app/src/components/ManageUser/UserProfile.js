import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditProfile from "./EditProfile";
import OpenModalButton from '../OpenModalButton'
import DeleteProfile from "./DeleteUser";
import PostCard from "../PostCard"


const UserProfile = () => {

    // const singleUser = useSelector((state) => state.user.singleUser)
    const user = useSelector((state) => state.session.user);




    return (
        <div>
            <div>
                <img src={user.profile_image} style={{ width: "40px", height: "50px" }} />
            </div>
            <div> {user.first_name} {user.last_name}</div>
            <div>{user.occupation}</div>
            <div>{user.city}, {user.state}</div>
            <div> {user.biography}</div>
            <OpenModalButton buttonText={'Edit User'} modalComponent={<EditProfile userId={user.id} />}
            />
             <OpenModalButton buttonText={'Delete User'} modalComponent={<DeleteProfile userId={user.id} />}
            />

{/* <PostCard/> */}


        </div>
    )

}
export default UserProfile










