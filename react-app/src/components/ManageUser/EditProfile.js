import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk} from "../../store/session";
import { useModal } from "../../context/Modal";
import { getUserThunk } from "../../store/user";
import DeleteProfile from "./DeleteUser";
import OpenModalButton from "../OpenModalButton";
import "./EditUser.css"


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
    const [imagePreview, setImagePreview] = useState(user.profile_image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
          setProfile_image(file)
          const reader = new FileReader();
          
          reader.onloadend = () => {
            setImagePreview(reader.result);
          }
          
          reader.readAsDataURL(file);
        }
      };
      
      const handleImageRemove = () => {
          setProfile_image(null);
          setImagePreview(null);
        };
      

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
        <>

            <form  className="edit-wrapper" method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
        <h3>Edit User Form</h3>
                <div className="edit-form-splash">
                <div className="edit-name">
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
                    </div>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <div className="edit-location">
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
                        id="edit-biography"
                            type="text"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                            required
                        />
                    </label>
                    <div className='post-image-button-section'>

                    <label>

                        <input
                            className="hidden-input"
                            type='file'
                            // onChange={(e) => setPost_images(e.target.files[0])}
                            onChange={handleImageChange}
                            accept='.jpg, .jpeg, .png'
                        // name='post_images'
                        />
                        <span
                            className="material-symbols-outlined"
                            onClick={() => document.querySelector('.hidden-input')}
                        >
                            image
                        </span>
                        Image (Optional)
                        </label>
                        {imagePreview && (
                            <>
                                <img src={imagePreview} alt="Preview" />
                                <button style={{ color: "black" }} id='remove-image-button' onClick={handleImageRemove}>X</button>
                            </>
                        )}
</div>



               

                <button type='submit'>Edit User</button>
                <OpenModalButton buttonText={'Delete User'}
                 modalComponent={<DeleteProfile userId={user.id} />}
                    />

<button onClick={props.onClose}>Close</button>

        </div>
            </form>
            	</>

    )



}
export default EditProfile