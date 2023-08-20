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
            <h3>you sure you want to delete your comment?</h3>
            <div className="delete-modal-buttons">
            <button onClick={ handleSubmit } className="confirm-delete"> confirm delete</button>
            <button onClick={ closeModal } className="cancel-delete"> keep comment</button>
         </div>
            </div>      
    )
}
export default DeleteComment
