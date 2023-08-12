import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import { getPostsThunk, getSinglePostThunk } from "../../store/post";
import EditPost from "../Post/EditPost";
import { getCommentsThunk } from "../../store/comment";
import { getLikesThunk } from "../../store/likes";



const PostCard = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const posts = Object.values(useSelector((state) => state.post.allPosts))
    const comments = Object.values(useSelector(state => state.comment.allComments))
    // const comments = useSelector(state => state.comment.allComments)
    const likes = Object.values(useSelector(state => state.likes.allLikes))

    console.log("POSTS-------->:", posts);
    console.log("COMMENTS-------->:", comments);
    console.log("LIKES-------->:", likes);


    useEffect(() => {



        dispatch(getPostsThunk())
        dispatch(getCommentsThunk())
        dispatch(getLikesThunk())
    }, [dispatch])

    console.log("COMMENTS DISPATCH-------->:", dispatch(getCommentsThunk));
    // const user = posts.user_id


    return (
        <div>
            <h1>RESTAURANT CARD:</h1>
            <div style={{ border: '1px solid red' }}>


                {posts.reverse().map((post) => (
                    <div key={post.id} style={{ border: '2px solid purple', margin: "20px" }}>

                        <div style={{ border: '2px solid magenta' }}>
                            <h1>POST BODY:</h1>

                            <p style={{ border: '1px solid green', fontWeight:"bolder", fontSize: "20px", color: "green"}}> {post.title}</p>
                            <p style={{ border: '1px solid blue' }}>{post.body}</p>

                            <img
                                src={post.post_images}
                                style={{ width: '300px', height: '300px', border: '1px solid pink' }}
                                alt="Post Images"
                            />
                        </div>
                        <div style={{ border: '2px solid teal' }}>
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
                        <div style={{ border: '2px solid orange' }}>
                            <h1>COMMENTS:</h1>

                            {comments
                                .filter((comment) => comment.post_id === post.id)
                                .reverse()
                                .map((comment) => (
                                    <div key={comment.id}>
                                        <img
                                            src={comment.profile_image}
                                            style={{ border: '1px solid orange', width: '20px', height: '20px' }}
                                        />
                                        <p> {comment.first_name} {comment.last_name} </p>
                                        <p> {comment.created_at}</p>
                                        <p> {comment.body}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}


                {/* <div style={{ border: '1px solid gold' }}>
                        <p>{user.first_name}, {user.last_name} </p>
                        <p> {user.occupation}</p>
                    </div> */}
                {/* <img
                    src={user.profile_image}

                    style={{ border: '1px solid orange', width: '100px', height: '100px' }}
                /> */}
            </div>



            <div>
                {/* <OpenModalButton buttonText='Delete Pin' modalComponent={<DeleteSinglePin postId={post.id}/>} /> */}
                {/* <OpenModalButton buttonText='Edit Post' modalComponent={<EditPost post={post} postId={post.id}/>} /> */}
            </div>

        </div>


    )

}
export default PostCard