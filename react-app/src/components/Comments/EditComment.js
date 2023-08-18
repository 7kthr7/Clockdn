import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCommentThunk, getCommentsThunk } from '../../store/comment';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";

import DeleteComment from './DeleteComment';
import "./EditComment.css"


const EditComment = ({ commentId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    
    const user = useSelector(state => state.session.user)


    const comments = Object.values(useSelector(state => state.comment.allComments))
    const commentDetail = comments.find((comment) => comment.id === commentId)
    const [body, setBody] = useState(commentDetail.body)

    console.log('SINGLE POST FROM ALL POST STATE-->', comments)
    console.log('POST ID AND OCCUPATION OF SINGLE POST -->', commentId)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const editComment = new FormData();

        editComment.append('body', body);

        dispatch(editCommentThunk(editComment, commentId));
        closeModal();
        // dispatch(getCommentsThunk())
    };

    return (
        <div className="edit-comment-form-wrapper">
            <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>

                <div className='comment-input-wrapper'>
                <img
                    src={user.profile_image}
                    style={{ width: "35px", height: "35px",borderRadius: "100%"}}
                />
                
                <label className="comment-label">
                    <textarea
                        className="edit-comment-textarea"
                        type='text'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Add a comment...'
                    />
                </label>
                </div>
    <div className="edit-buttons">
        
           <div id="delete-submit-comment">
            <OpenModalButton buttonText={'Delete Comment'} 
                    modalComponent={<DeleteComment commentId={commentDetail.id} />}
                />
                </div>
                {body && <button  className="edit-submit-comment" type='submit'>Edit Comment</button>}
                </div>
            </form>
        </div>
    );
    
}
export default EditComment