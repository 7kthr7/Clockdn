import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk, getCommentsThunk } from '../../store/comment';
import { useModal } from '../../context/Modal';

const DeleteComment = ({ commentId }) => {


    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(deleteCommentThunk(commentId))
        closeModal()
        dispatch(getCommentsThunk())
    }

    return (
       
            <div className="delete-modal-wrapper">
            <h3>Are you sure you want to delete this comment?</h3>
            <div className="delete-modal-buttons">
            <button onClick={ handleSubmit } className="confirm-delete"> Yes Delete Comment</button>
            <button onClick={ closeModal } className="cancel-delete"> No Keep Comment</button>
        
         {/* <button onClick= { handleSubmit } > Yes Delete </button> */}

         </div>
            </div>
         
    )

}
export default DeleteComment
