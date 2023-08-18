import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePostThunk, getPostsThunk } from '../../store/post';
import { useModal } from '../../context/Modal';
import './DeletePost.css'


const DeletePost = ({ postId }) => {


    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(deletePostThunk(postId))
        closeModal()
        dispatch(getPostsThunk())
    }

    return (
        <div className="delete-modal-wrapper">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="delete-modal-buttons">
                <button onClick={handleSubmit} className="confirm-delete">Yes, Delete</button>
                <button onClick={closeModal} className="cancel-delete">No, Don't Delete</button>
            </div>
        </div>
    );
}
export default DeletePost
