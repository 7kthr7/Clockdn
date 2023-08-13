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
        <div>
        <button onClick={handleSubmit}>Yes Delete</button>
        <button onClick={closeModal}>No Don't Delete</button>
        </div>
    )

}
export default DeleteProfile