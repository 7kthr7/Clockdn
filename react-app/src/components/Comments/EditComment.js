import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCommentThunk, getCommentsThunk } from '../../store/comment';
import { useModal } from '../../context/Modal';


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
        <div>
            <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
            <label>
                        Comment
                        <textarea
                            type='text'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </label>

                    <button type='submit'>Edit Comment</button>
            </form>

        </div>
    )

}
export default EditComment