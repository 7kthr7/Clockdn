import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/comment';
import { useModal } from '../../context/Modal';

const CreateComment = ({ postId, allComments }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [body, setBody] = useState('')
    const [frontendErrors, setFrontendErrors] = useState({})

    // const user = useSelector(state => state.session.user)


    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const postDetail = posts.find((post) => post.id === postId)

    console.log('SINGLE POST FROM ALL POST STATE-->', postDetail)
    console.log('POST ID AND OCCUPATION OF SINGLE POST -->', postId)

    useEffect(() => {
        const frontendErrors = {}


        if (body.length > 1000) {
            frontendErrors.body = "Comment must be less than 100 characters"
        }
        

        setFrontendErrors(frontendErrors)
    }, [body])

    let disable = body.length === 0 || body.length > 1000;





    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = new FormData();

        newComment.append('body', body);
       

        dispatch(createCommentThunk( postDetail.id, newComment,));
        closeModal();
        dispatch(getCommentsThunk())
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

                    {body && <button disabled={disable} type='submit'>Create Comment</button>}
            </form>

        </div>
    )

}
export default CreateComment