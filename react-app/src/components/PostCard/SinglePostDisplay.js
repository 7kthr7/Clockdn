
import { useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton'
import EditPost from "../Post/EditPost";
// import DeletePost from "../Post/DeletePost";
import CreateComment from "../Comments/CreateComment";
import EditComment from "../Comments/EditComment";
import DeleteComment from "../Comments/DeleteComment";
import LikeToggle from "../Likes";
import "./style.css"

const SinglePostCard = ({ post, postComments, user }) => {
    const history = useHistory()

    const handleProfilePage = (userId) => {
        history.push(`/user/${userId}`);
    };

    return (
        <div key={post.id} className="individual-post-container">
            <div className="post-body">
                <div className="edit-post">

                    {post.user_id === user.id && (
                        <OpenModalButton buttonText=' ... ' modalComponent={<EditPost postId={post.id} />} />
                    )}
         
                </div>
                <div onClick={() => handleProfilePage(post.user_id)}>
                   
                     
                    <img
                        src={post.profile_image}
                        className="profile-image-post"
                    />
                <h3 className="post-user-name">{post.first_name} {post.last_name} </h3>
                </div>
                <p className="post-user-occupation">{post.occupation}</p>    
                <p className="post-title"> {post.title}</p>
                <p className="post-text" >{post.body}</p>


                {post.post_images && (
                    <img
                        src={post.post_images}
                        style={{ height: '250px', border: '1px solid pink' }}
                        alt="Post Images"
                        className="post-media"
                    />
                )}

                <div className="post-like-toggle">
                    <LikeToggle postId={post.id} />
                 
                </div>


                <div className="post-comment-wrapper" >
                                  
                        {postComments
                            .filter((comment) => comment.post_id === post.id)
                            .map((comment) => (
                                <div key={comment.id} >
                                    
                                    <div onClick={() => handleProfilePage(comment.user_id)}>

                                    <img
                                        src={comment.profile_image}
                                        className="comment-user-profile-picture"
                                    />






                                    <p id="coment-user-name"> {comment.first_name} {comment.last_name} </p>
                                   <p id="comment-user-occupation" >{comment.occupation}</p>
                                   
                                    </div>



                                    {/* <p id="comment-created-at"> {comment.created_at}</p> */}
                                    <p id="comment-body"> {comment.body}</p>
                                    <div className="edit-comment">
                                    {comment.user_id === user.id && (
                                        <OpenModalButton buttonText='Edit Comment' modalComponent={<EditComment commentId={comment.id} />} />
        
                                    )}
                                    {comment.user_id === user.id && (
                                        <OpenModalButton buttonText='Delete Comment' modalComponent={<DeleteComment commentId={comment.id} />} />
        
                                    )}
                                    </div>
        
                                </div>
                            ))}
                            <OpenModalButton buttonText='Comment' modalComponent={<CreateComment postId={post.id} />} />

                            </div>
            </div>


        </div>
    );






};
export default SinglePostCard