import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePostThunk, getPostsThunk } from '../../store/post';
import { useModal } from '../../context/Modal';

const DeletePost = ({ postId }) => {


    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(deletePostThunk(postId))
        closeModal()
        dispatch(getPostsThunk())
    }

    return (
        <div>
            <button onClick={handleSubmit}>Yes Delete</button>
            <button onClick={closeModal}>No Don't Delete</button>
        </div>
    )

}
export default DeletePost
