import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk, createPostThunk } from '../../store/post';
import { useModal } from '../../context/Modal';


const CreatePost = () => {
    // const sessionUser = useSelector((state) => state.session.user);
    // const posts = Object.values(useSelector((state) => state.post.posts))
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({})

    useEffect(() => {
        
        const frontendErrors = {}
        if (body.length < 1) {
            frontendErrors.body = "Post most have more than 1 character"
        }
        if (body.length > 1000) {
            frontendErrors.body = "Post most have less than 1000 character"
        }
        setFrontendErrors(frontendErrors)
    }, [body])
    const handleSubmit = async (e) => {
        e.preventDefault();
//chain
        const newPost = new FormData();
        newPost.append('title', title)
        newPost.append('body', body)
        newPost.append('postImage', postImage)
        dispatch(createPostThunk(newPost))
        closeModal()
        console.log('PROFILE IMAGE--->', postImage)

    }

    return (
        <div>
            <h3>NEW POST FORM</h3>
            <form  method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>
                    Title
                    <textarea
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Body
                    <textarea
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        type="file"
                        onChange={(e) => setPostImage(e.target.files[0])}
                        accept=".jpg, .jpeg, .png"
                        name='post_images'
                    />
                </label>
                <button type="submit">Clock in your post</button>
            </form>

        </div>
    )

}
export default CreatePost


