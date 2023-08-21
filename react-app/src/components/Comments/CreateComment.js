import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/comment';
import './CreateComment.css'

const CreateComment = ({ postId, allComments }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({})


    // retrieving state from redux. search the all post state for a post with the same postId prop that's passed in. 
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const postDetail = posts.find((post) => post.id === postId)



    console.log('SINGLE POST FROM ALL POST STATE-->', postDetail)
    console.log('POST ID AND OCCUPATION OF SINGLE POST -->', postId)

    //useEffect monitoring changes to the body variable. the error conditional re-renders when ever body changes.
    useEffect(() => {
        const frontendErrors = {}
        if (body.length > 500) {
            frontendErrors.body = "Comment must be less than 500 characters"
        }
        setFrontendErrors(frontendErrors)
    }, [body])

    //if the body count is 0 or more than 500 characters don't show the submit button
    let disable = false;
    body.length > 500 || (disable = true);
    
    //async event handler that executes when the form is submitted while not causing a full page refresh thanks to e.preventDefault
    const handleSubmit = async (e) => {
        e.preventDefault();

        //form being sent back to the backend to save in the db using thunks from the redux store
        // dispatch all comments so the comment shows up and set body to empty string so that it clears the text area
        const newComment = new FormData();
        newComment.append('body', body);
        dispatch(createCommentThunk(postDetail.id, newComment));
        dispatch(getCommentsThunk())
        setBody("");
    };

    return (
        <div className="comment-form-wrapper">
            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='comment-input-wrapper'>
                    <img
                        src={user.profile_image}
                        style={{ width: "35px", height: "35px",borderRadius: "100%"}}
                    />                
                    <label className="comment-label">
                    <textarea
                        className="comment-textarea"
                        row = {2}
                        type='text'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Add a comment...'
                    />
                    </label>
                    
                </div>  
                {body && < button disabled={Object.keys(frontendErrors).length > 0} className="submit-comment" type='submit'>Create Comment</button>}
                <div className='post-errors'>
                    {frontendErrors.body && (
                        <p className='on-submit-errors'>{frontendErrors.body}</p>
                    )}

                    <p>
                        {errors.map((error, idx) => (
                            <p className='on-submit-errors' key={idx}>{error}</p>
                        ))}
                    </p>
                </div>  
            </form>
        </div>
    );

}
export default CreateComment