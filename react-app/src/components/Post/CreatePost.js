import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../store/post';
import { useModal } from '../../context/Modal';
// import OpenModalButton from '../OpenModalButton'
import './CreatePost.css'


const CreatePost = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState('');
    const [post_images, setPost_images] = useState(null);
    const [errors, setErrors] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({})



    let disable = false;
    body.length > 5 || (disable = true);
    body || (disable = true);


    useEffect(() => {
        const frontendErrors = {}


        if (body.length > 2000) {
            frontendErrors.body = "Post must be less than 500 characters"
        }
        if (body.length < 5) {
            frontendErrors.body = ""
        }

        setFrontendErrors(frontendErrors)
    }, [body])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = new FormData();
        newPost.append('title', title);
        newPost.append('body', body);
        newPost.append('post_images', post_images);

        dispatch(createPostThunk(newPost));

        closeModal();
    };

    return (
        <div className='create-post-wrapper'>

            <h3>NEW POST FORM</h3>
            {/* <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePost />}
                    className = "start-post-button"
                /> */}



            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
                {/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}

                <label>
                    Title (Optional)
                    <textarea
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>


                <label>
                    Body
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </label>


                <label>
                    Image (Optional)
                    <input
                        type='file'
                        onChange={(e) => setPost_images(e.target.files[0])}
                        accept='.jpg, .jpeg, .png, .gif'
                        name='post_images'
                    />
                </label>

                <button disabled={Object.keys(frontendErrors).length > 0} type='submit'>Create Post</button>
                <div className='post-errors'>
                    {frontendErrors.body && body.length > 0 && (
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
};

export default CreatePost;
