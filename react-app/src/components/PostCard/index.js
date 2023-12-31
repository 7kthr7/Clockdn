import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getPostsThunk } from "../../store/post";
import { getCommentsThunk } from "../../store/comment";
import { getLikesThunk } from "../../store/likes";
import SinglePostCard from "./SinglePostDisplay";
import LikeToggle from "../Likes";

import "./style.css"

const PostFeed = () => {
    const dispatch = useDispatch()
    // const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const comments = Object.values(useSelector(state => state.comment.allComments))
    const likes = Object.values(useSelector(state => state.likes.allLikes))

    

    // const handleProfilePage = (userId) => {
    //     history.push(`/user/${userId}`);
    // };
    

    useEffect(() => {
        dispatch(getCommentsThunk())
        dispatch(getLikesThunk())
        dispatch(getPostsThunk())
    }, [dispatch])


    return (
        <div className="feed-page">
            <div className="posts-wrapper">
                {posts.reverse().map((post) => (
                    <div key={post.id}>
                        <SinglePostCard
                            post={post}
                            // postLikes={likes.filter(like => like.post_id === post.id)}
                            postComments={comments.filter(comment => comment.post_id === post.id)}
                            user={user}
                        />
                        
                    </div>
                ))}
            </div>
        </div>
    );

}
export default PostFeed


//     // return (
//     //     <div className="feed-page" style={{ border: '1px solid green' }}>
//     //         <div className="posts-wrapper" >

//     //             {posts.reverse().map((post) => (
//     //                 <div key={post.id} className="individual-post-container">
//     //                     <div>
//     //                         <h1>POST BODY:</h1>
//     //                         {/* if the session user and the post.user_id match the let the uesr edit */}
//     //                         {post.user_id === user.id && (
//     //                             <OpenModalButton buttonText='Edit Post' modalComponent={<EditPost postId={post.id} />} />

//     //                         )}
//     //                         {post.user_id === user.id && (
//     //                             <OpenModalButton buttonText='Delete Post' modalComponent={<DeletePost postId={post.id} />} />

//     //                         )}
//     //                         <div onClick={() => handleProfilePage(post.user_id)}>
//     //                         <img
//     //                             src={post.profile_image}
//     //                             style={{ width: '30px', height: '30px', border: '1px solid pink' }}
//     //                             className="profile-image-post"
//     //                         />
//     //                         <p className="post-user-name">{post.first_name} {post.last_name} </p>
//     //                         </div>
//     //                         <p className="post-user-occupation">{post.occupation}</p>

//     //                         <p className="post-title"> {post.title}</p>
//     //                         <p className="post-body" >{post.body}</p>
//     //                         {post.post_images &&(

                            
//     //                         <img
//     //                             src={post.post_images}
//     //                             style={{ width: '250px', height: '250px', border: '1px solid pink' }}
//     //                             alt="Post Images"
//     //                             className="post-media"
//     //                         />
//     //                         )}
//     //                     </div>
//                         <div className="post-likes" >
//                             <LikeToggle postId={post.id} />

//                             <h1>LIKES:</h1>


//                             {likes
//                                 .filter((like) => like.post_id === post.id)
//                                 .reverse()
//                                 .map((like) => (
//                                     <div key={like.id}>
//                                         <p>{like.first_name} {like.last_name} liked this post</p>
//                                     </div>

//                                 ))}
// //     //                     </div>
                        // <div className="post-comment-wrapper" >
                        //     <h1>COMMENTS:</h1>
                        //         <OpenModalButton buttonText='Comment' modalComponent={<CreateComment postId={post.id} />} />
                        // </div>

                        // {comments
                        //     .filter((comment) => comment.post_id === post.id)
                        //     .map((comment) => (
                        //         <div key={comment.id} >
                        //             {comment.user_id === user.id && (
                        //                 <OpenModalButton buttonText='Edit Comment' modalComponent={<EditComment commentId={comment.id} />} />
        
                        //             )}
                        //             {comment.user_id === user.id && (
                        //                 <OpenModalButton buttonText='Delete Comment' modalComponent={<DeleteComment commentId={comment.id} />} />
        
                        //             )}
                        //             <div onClick={() => handleProfilePage(comment.user_id)}>
                        //             <img
                        //                 src={comment.profile_image}
                        //                 className="comment-user-profile-picture"
                        //                 style={{ border: '1px solid orange', width: '20px', height: '20px' }}
                        //             />
                        //             <p className="coment-user-name"> {comment.first_name} {comment.last_name} </p>
                        //             </div>
                        //             <p className="comment-created-at"> {comment.created_at}</p>
                        //             <p className="comment-body"> {comment.body}</p>
        
                        //         </div>
                        //     ))}
//     //                 </div>
//     //             ))}
//     //             <div>

//     //             </div>
//     //         </div>


//     //     </div>


//     // )

// }
// export default PostCard