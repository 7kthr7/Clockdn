import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editPostThunk, getPostsThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "./DeletePost";
// import { useParams } from 'react-router-dom'


const EditPost = ({ postId }) => {
    // const { postId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const posts = Object.values(useSelector((state) => state.post.allPosts))

    console.log('ALL POST STATE --->', posts)

    const postDetail = posts.find((post) => post.id === postId)

    console.log('SINGLE POST FROM ALL POST STATE-->', postDetail)
    console.log('POST ID AND OCCUPATION OF SINGLE POST -->', postId, postDetail.occupation)

    const [title, setTitle] = useState(postDetail.title);
    const [body, setBody] = useState(postDetail.body);
    const [post_images, setPost_images] = useState(postDetail.post_images);
    const [imagePreview, setImagePreview] = useState(postDetail.post_images);
    const [removeImageFlag, setRemoveImageFlag] = useState(false);


    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newPost = new FormData();
        newPost.append('title', title)
        newPost.append('body', body)
        newPost.append('post_images', post_images)


        dispatch(editPostThunk(newPost, postDetail.id));
        closeModal();
        dispatch(getPostsThunk())
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
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

            <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>

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

                        <div className="edit-form-button" >
                        <button   type='submit'>Edit Post</button>



                        <OpenModalButton buttonText={'Delete Post'} 
                            modalComponent={<DeletePost postId={postDetail.id} />}
                        />

</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPost;