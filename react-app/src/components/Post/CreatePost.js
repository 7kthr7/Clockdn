import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../store/post';
import { useModal } from '../../context/Modal';
// import OpenModalButton from '../OpenModalButton'


const CreatePost = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState('');
    const [post_images, setPost_images] = useState(null);
    const [errors, setErrors] = useState([]);
	const [frontendErrors, setFrontendErrors] = useState({})


	useEffect(() => {
		const frontendErrors = {}

		if (!body.length) {
			frontendErrors.body = "A body is required to make a post"
		}
		if (body.length < 500) {
			frontendErrors.body = "Post must be less than 500 characters"
		}
		if (body.length < 5) {
			frontendErrors.body = "Post must be greater than 5 characters"
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
        <div>
              
            <h3>NEW POST FORM</h3>
            {/* <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePost />}
                    className = "start-post-button"
                /> */}



            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
            <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
                
                    <label>
                        Title
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
                        Image
                        <input
                            type='file'
                            onChange={(e) => setPost_images(e.target.files[0])}
                            accept='.jpg, .jpeg, .png, .gif'
                            name='post_images'
                        />
                    </label>
             
                <button type='submit'>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
