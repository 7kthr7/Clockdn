import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/comment';
import { useModal } from '../../context/Modal';
import './CreateComment.css'


const CreateComment = ({ postId, allComments }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [body, setBody] = useState('')
    const [frontendErrors, setFrontendErrors] = useState({})

    const user = useSelector(state => state.session.user)


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


    useEffect(() => {
        // Function to adjust textarea height
        const handleTextareaInput = function() {
            this.style.height = 'auto';           // Reset height to auto to shrink if text is removed
            this.style.height = (this.scrollHeight) + 'px';  // Set the height to the content's scroll height
        };
        
        const textareaElement = document.querySelector('.comment-textarea');
        if (textareaElement) {
            textareaElement.addEventListener('input', handleTextareaInput);
        }
    
        //Cleanup
        return () => {
            if (textareaElement) {
                textareaElement.removeEventListener('input', handleTextareaInput);
            }
        };
    }, []); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = new FormData();

        newComment.append('body', body);
       

        await setBody("");
    dispatch(createCommentThunk( postDetail.id, newComment,));
        // closeModal();
    // dispatch(getCommentsThunk())

    };
    // document.querySelector('.comment-textarea').addEventListener('input', function() {
    //     this.style.height = 'auto';           // Reset height to auto to shrink if text is removed
    //     this.style.height = (this.scrollHeight) + 'px';  // Set the height to the content's scroll height
    // });
    

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
                        type='text'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Add a comment...'
                    />
                </label>
                </div>
    
                {body && <button disabled={disable} className="submit-comment" type='submit'>Create Comment</button>}
            </form>
        </div>
    );

}
export default CreateComment