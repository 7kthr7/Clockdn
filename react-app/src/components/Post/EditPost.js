import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPostThunk, getPostsThunk } from '../../store/post';
import { useModal } from '../../context/Modal';

const EditPost = ({ postId }) => { 
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
    const post = Object.values(useSelector((state) => state.post.allPosts));

    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [post_images, setPost_images] = useState(post.post_images);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const editPostData = new FormData();
        editPostData.append('title', title);
        editPostData.append('body', body);
        editPostData.append('post_images', post_images);

        await dispatch(editPostThunk(postId, editPostData))

        await closeModal();
    };

    return (
        <div>
            <h3>EDIT POST FORM</h3>
            <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
                
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
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    );
};

export default EditPost;
