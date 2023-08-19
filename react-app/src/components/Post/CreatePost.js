import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

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
    const [imagePreview, setImagePreview] = useState(null);


    const sessionUser = useSelector((state) => state.session.user);


    let disable = false;
    body.length > 5 || (disable = true);
    body || (disable = true);


    useEffect(() => {
        const frontendErrors = {}


        if (body.length > 2000) {
            frontendErrors.body = "Post must be less than 2000 characters"
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

    const handleImageChange = (e) => {
  const file = e.target.files[0];
  
  if (file) {
    setPost_images(file)
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    
    reader.readAsDataURL(file);
  }
};

const handleImageRemove = () => {
    setPost_images(null);
    setImagePreview(null);
  };

    return (
        <div className='create-post-wrapper'>

            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>

<div className='create-post-user'>
                <img
                src={sessionUser.profile_image}
                />
                <h3>{sessionUser.first_name}{sessionUser.last_name}</h3>

</div>
<div className='form-content'>

                <label id='title-post'>
                   
                    <input
                        type='text'
                        placeholder='Title (Optional)'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>


                <label id='body-post'>
                   
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='What do you want to say?'
                        required
                    />
                </label>
                    <div className='post-image-button-section'>

                    <label>

                        <input
                            className="hidden-input"
                            type='file'
                            // onChange={(e) => setPost_images(e.target.files[0])}
                            onChange={handleImageChange}
                            accept='.jpg, .jpeg, .png, .gif'
                        // name='post_images'
                        />
                        <span
                            className="material-symbols-outlined"
                            onClick={() => document.querySelector('.hidden-input')}
                        >
                            image
                        </span>
                        Image (Optional)
                        </label>
                        {imagePreview && (
                            <>
                                <img src={imagePreview} alt="Preview" />
                                <button id='remove-image-button' onClick={handleImageRemove}>X</button>
                            </>
                        )}



                <button className="post-form-button" disabled={Object.keys(frontendErrors).length > 0} type='submit'>Create Post</button>
                </div>
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
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
