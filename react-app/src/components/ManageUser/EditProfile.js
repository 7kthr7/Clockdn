import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk} from "../../store/session";
import { useModal } from "../../context/Modal";
import { getUserThunk } from "../../store/user";
import DeleteProfile from "./DeleteUser";
import OpenModalButton from "../OpenModalButton";


const EditProfile = (props) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    // const allUsers = Object.values(useSelector((state) => state.user.allUser));  
    // const userDetail = allUsers.find((user) => user.id === userId)

    const [first_name, setFirst_name] = useState(user.first_name);
    const [last_name, setLast_name] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [occupation, setOccupation] = useState(user.occupation);
    const [biography, setBiography] = useState(user.biography);
    const [profile_image, setProfile_image] = useState(user.profile_image);


    const handleSubmit = async (e) => {
        e.preventDefault();


        const editUser = new FormData();
        editUser.append('first_name', first_name)
        editUser.append('last_name', last_name)
        editUser.append('email', email)
        editUser.append('city', city)
        editUser.append('state', state)
        editUser.append('occupation', occupation)
        editUser.append('biography', biography)
        editUser.append('profile_image', profile_image)

       await dispatch(editUserThunk(editUser, user.id));
        closeModal();
       dispatch(getUserThunk())
   
    }



    return (
        <div className="sign-up-form-splash">

            <h3>Edit User Form</h3>

            <form   method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className="sign-up-name">
                    <label>
                        First Name
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <div className="sign-up-location">
                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                    </div>

                    <label>
                        Occupation
                        <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        About Me
                        <input
                        id="sign-up-biography"
                            type="text"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                            required
                        />
                    </label>
                    <div >
                        <label>
                            <input


                                type="file"
                                onChange={(e) => setProfile_image(e.target.files[0])}
                                accept=".jpg, .jpeg, .png"

                            />
                        </label>

                    </div>




                </div>

                <button type='submit'>Edit User</button>
                <OpenModalButton buttonText={'Delete User'}
                 modalComponent={<DeleteProfile userId={user.id} />}
                    />

<button onClick={props.onClose}>Close</button>

            </form>

        </div>
    )



}
export default EditProfile