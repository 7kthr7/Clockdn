import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteUserThunk } from "../../store/session";
import { logout} from "../../store/session";

const DeleteProfile = ({ userId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()


        await dispatch(deleteUserThunk(userId))
        await dispatch(logout())
        history.push('/')
        await closeModal()
    }

    return (
        <div className="delete-modal-wrapper">
            <h3>you sure you want to delete your account?</h3>
            <div className="delete-modal-buttons">
        <button onClick={handleSubmit} className="confirm-delete">Yes, delete my account</button>
        <button onClick={closeModal} className="cancel-delete">I want to keep my account</button>
        </div>
        </div>
    )
 
}
export default DeleteProfile