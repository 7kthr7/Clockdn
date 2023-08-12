import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { getPostsThunk, getSinglePostThunk } from "../../store/post";
import EditPost from "../Post/EditPost";
import DeletePost from "../Post/DeletePost";
import "./style.css"

import { getCommentsThunk } from "../../store/comment";
import { getLikesThunk } from "../../store/likes";

const PostCard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const comments = Object.values(useSelector(state => state.comment.allComments))
    const likes = Object.values(useSelector(state => state.likes.allLikes))
    console.log("POSTS-------->:", posts);
    console.log("COMMENTS-------->:", comments);
    console.log("LIKES-------->:", likes);

    // Add Comment Get's passed here 
    // Edit Comment Get's passed here
    // Delete Comment Get's passed here
    // Add Likes Get's passed here
    // Remove Likes Get's Passed here 
    // Edit Button Modal get's passed here
    // Delete Button get's passed here

    useEffect(() => {
        dispatch(getPostsThunk())
        dispatch(getCommentsThunk())
        dispatch(getLikesThunk())
    }, [dispatch])
    console.log("COMMENTS DISPATCH-------->:", dispatch(getCommentsThunk));
    


    return (
        <div className="feed-page" style={{ border: '1px solid green' }}> 
            <div className="posts-wrapper" >
                
                {posts.reverse().map((post) => (
                    <div key={post.id}  className="individual-post-container">
                        <div>
                            <h1>POST BODY:</h1>
                            {/* if the session user and the post.user_id match the let the uesr edit */}
                            {post.user_id === user.id && (
                 <OpenModalButton buttonText='Edit Post' modalComponent={<EditPost postId={post.id}/>} /> 

                )}
                {post.user_id === user.id && (
                 <OpenModalButton buttonText='Delete Post' modalComponent={<DeletePost postId={post.id}/>} /> 

                )}
                            <img
                                src={post.profile_image}
                                style={{ width: '30px', height: '30px', border: '1px solid pink' }}
                                className="profile-image-post"
                            />
                            <p className="post-user-name">{post.first_name} {post.last_name} </p>
                           
                            <p className="post-user-occupation">{post.occupation}</p>

                            <p className="post-title"> {post.title}</p>
                            <p className="post-body" >{post.body}</p>
                            <img
                                src={post.post_images}
                                style={{ width: '250px', height: '250px', border: '1px solid pink' }}
                                alt="Post Images"
                                className="post-media"
                            />
                        </div>
                        <div className="post-likes" >
                            <h1>LIKES:</h1>
                            {likes
                                .filter((like) => like.post_id === post.id)
                                .reverse()
                                .map((like) => (
                                    <div key={like.id}>
                                        <p>{like.first_name} {like.last_name} liked this post</p>
                                    </div>
                                ))}
                        </div>
                        <div className="post-comment-wrapper" >
                            <h1>COMMENTS:</h1>
                            {comments
                                .filter((comment) => comment.post_id === post.id)
                                .reverse()
                                .map((comment) => (
                                    <div key={comment.id} >
                                        <img
                                            src={comment.profile_image}
                                            className="comment-user-profile-picture"
                                            style={{ border: '1px solid orange', width: '20px', height: '20px' }}
                                        />
                                        <p className="coment-user-name"> {comment.first_name} {comment.last_name} </p>
                                        <p className="comment-created-at"> {comment.created_at}</p>
                                        <p className="comment-body"> {comment.body}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            <div>
                {/* <OpenModalButton buttonText='Delete Pin' modalComponent={<DeleteSinglePin postId={post.id}/>} /> */}
            </div>
            </div>


        </div>


    )

}
export default PostCard