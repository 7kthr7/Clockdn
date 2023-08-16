import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editPostThunk, getPostsThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeletePost from "./DeletePost";
// import { useParams } from 'react-router-dom'


const EditPost = ({ postId }) => {
// const { postId } = useParams();

    const dispatch = useDispatch();
    const posts = Object.values(useSelector((state) => state.post.allPosts))

    console.log('ALL POST STATE --->', posts)

    const postDetail = posts.find((post) => post.id === postId)

    console.log('SINGLE POST FROM ALL POST STATE-->', postDetail)
    console.log('POST ID AND OCCUPATION OF SINGLE POST -->', postId, postDetail.occupation)
   
    const [title, setTitle] = useState(postDetail.title);
    const [body, setBody] = useState(postDetail.body);
    const [post_images, setPost_images] = useState(postDetail.post_images);
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
    return (
                <div>
                      
                    <h3>EDIT POST FORM</h3>
                  
                    <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
                        <div>
                            {postDetail.first_name} {postDetail.last_name}
                            <img
                            src={postDetail.profile_image}
                            style={{ width: "40px", height: "50px" }}
                            />
                        </div>
                                   
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
                     
                        <button type='submit'>Edit Post</button>
                        <OpenModalButton buttonText={'Delete Post'}
                 modalComponent={<DeletePost postId={postDetail.id} />}
                    />
                    </form>
                </div>
            );
        };
        
        export default EditPost;