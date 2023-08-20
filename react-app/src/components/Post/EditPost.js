import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { editPostThunk} from "../../store/post";
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
    const { closeModal } = useModal()
    const imageInputRef = useRef(null);
    const fileReader = new FileReader();
    const [errors, setErrors] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({})

    
    let disable = false;
    body.length > 5 || (disable = true);
    body || (disable = true);


    useEffect(() => {
        const frontendErrors = {}


        if (body.length > 2000) {
            frontendErrors.body = "Post must be less than 2000 characters"
        }
        if (body.length < 1) {
            frontendErrors.body = ""
        }
        if (title.length > 100) {
            frontendErrors.title = "Title must be less than 100 characters"
        }

        setFrontendErrors(frontendErrors)
    }, [body, title])

    useEffect(() => {
        // Cleanup FileReader to prevent memory leaks
        return () => {
            fileReader.abort();
        };
    }, []);

    fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = new FormData();
        newPost.append('title', title);
        newPost.append('body', body);
        if (post_images !== null) {
            newPost.append('post_images', post_images);
        }

        // Handle potential error during dispatch
        try {
            await dispatch(editPostThunk(newPost, postDetail.id));
            closeModal();
            // Removed getPostsThunk() for efficiency
        } catch (error) {
            console.error("Failed to edit post:", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPost_images(file);
            fileReader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setPost_images("remove_image");
        setImagePreview(null);
        // Reset the input field
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
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
                            ref={imageInputRef}
                            className="hidden-input"
                            type='file'
                            onChange={handleImageChange}
                            accept='.jpg, .jpeg, .png, .gif'
                            aria-label="Upload image"
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
                                <button id='remove-image-button' onClick={handleImageRemove} aria-label="Remove image">X</button>                            </>
                        )}

                        <div className="edit-form-button" >
                        <button disabled={Object.keys(frontendErrors).length > 0}   type='submit'>Edit Post</button>


                        <OpenModalButton buttonText={'Delete Post'} 
                            modalComponent={<DeletePost postId={postDetail.id} />}
                        />
                        <div className='post-errors'>
                    {frontendErrors.body && body.length > 0 && (
                        <p className='on-submit-errors'>{frontendErrors.body}</p>
                    )}
                    {frontendErrors.title && title.length > 0 && (
                        <p className='on-submit-errors'>{frontendErrors.title}</p>
                    )}

                    <p>
                        {errors.map((error, idx) => (
                            <p className='on-submit-errors' key={idx}>{error}</p>
                        ))}
                    </p>
                </div>

</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPost;