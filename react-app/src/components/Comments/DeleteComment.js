import React, { useState, useEffect } from 'react';
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
        <div>
            <button onClick={ handleSubmit }> Yes Delete Comment</button>
            <button onClick={ closeModal }> No Keep Comment</button>
        </div>
        // <button onClick= { handleSubmit } > Yes Delete </button>
           
    )

}
export default DeleteComment
