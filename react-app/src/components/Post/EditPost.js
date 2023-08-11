// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from "react-redux";
// // import { editPostThunk } from '../../store/post';
// // import { useModal } from '../../context/Modal';


// // const EditPost = () => {
// //     //Get Post from state
// //     //Bring in imports
// //     const dispatch = useDispatch()
// //     const { closeModal } = useModal();
// //     const posts = Object.values(useSelector((state) => state.post.allPosts))
// //     const [title, setTitle] = useState(posts.title)
// //     const [body, setBody] = useState(posts.body)
// //     const [post_images] = useState(posts.post_images)

    
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const editPost = new FormData();
// //         editPost.append('title', title);
// //         editPost.append('body', body);
// //         editPost.append('post_images', post_images);

// //         dispatch(editPostThunk(editPost));
       
// //         closeModal();
// //     };

// //     return (
// //         <div>
              
// //             <h3>NEW POST FORM</h3>


// //             <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
                
// //                     <label>
// //                         Body
// //                         <textarea
// //                             value={body}
// //                             onChange={(e) => setBody(e.target.value)}
// //                             required
// //                         />
// //                     </label>
               
                
// //                     <label>
// //                         Title
// //                         <textarea
// //                             type='text'
// //                             value={title}
// //                             onChange={(e) => setTitle(e.target.value)}
// //                         />
// //                     </label>
                  
               
                 
// //                     <label>
// //                         Image
// //                         <input
// //                             type='file'
// //                             onChange={(e) => setPost_images(e.target.files[0])}
// //                             accept='.jpg, .jpeg, .png'
// //                             name='post_images'
// //                         />
// //                     </label>
                
// //                 <button type='submit'>Create Post</button>
// //             </form>
// //         </div>
// //     );


















// // } 
// // export default EditPost


// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { editPostThunk } from '../../store/post';
// import { useModal } from '../../context/Modal';

// const EditPost = ({ post }) => {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();
    
//     const [title, setTitle] = useState('');
//     const [body, setBody] = useState('');
//     const [post_images, setPost_images] = useState(null);
//     console.log("---------------------------->", post_images)


//     useEffect(() => {
//         setTitle(post.title);
//         setBody(post.body);
//         setPost_images([post.post_images])
//     }, [post]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const editPost = new FormData();
//         editPost.append('title', title);
//         editPost.append('body', body);
//         editPost.append('post_images', post_images);
        
// //I think not working becausue what is the post.id?
//         dispatch(editPostThunk(post.id, editPost));
//         console.log("---------------------------->", post_images)

//         closeModal();
//     };
//     console.log("---------------------------->", post_images)


//     return (
//         <div>
//             <h3>EDIT POST FORM</h3>
//             <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
//                 <label>
//                     Body
//                     <textarea
//                         value={body}
//                         onChange={(e) => setBody(e.target.value)}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Title
//                     <input
//                         type='text'
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </label>

//                 <label>
//                     Image
//                     <input
//                         type='file'
//                         onChange={(e) => setPost_images(e.target.files[0])}
//                         accept='.jpg, .jpeg, .png'
//                         name='post_images'
//                     />
//                 </label>

//                 <button type='submit'>Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default EditPost;
