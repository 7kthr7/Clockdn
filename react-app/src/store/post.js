//action 
const GET_POSTS = "post/GET_POST"
const CREATE_POST = "post/CREATE_POST"
// const EDIT_POST = "post/EDIT_POST"
// const DELETE_POST = 'post/DELETE_POST'

//action creator

const getPost = (posts) => ({
    type: GET_POSTS,
    posts
   
})

const addPost = (post) => ({
    type: CREATE_POST,
    post
})

// const editPost = (postId) => ({
//     type: EDIT_POST,
//     postId
// })
// const deletePost = (postId) => ({
//     type: DELETE_POST,
//     postId
// })


//thunk
export const getPostsThunk = () => async (dispatch) => {
    const response = await fetch("/api/post/feed");
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getPost(data));
    }
}

export const createPostThunk = (post) => async (dispatch) => {
    const response = await fetch("/api/post/feed/new", {
        method: 'POST',
        body: post
     
    });
    // console.log("---------->", response)

    if (response.ok) {
        const data = await response.json();
        // console.log("--------------->", data)
        dispatch(addPost(data));
        dispatch(getPostsThunk());
        
    } else {
        const errorData = await response.json();
        if (errorData.errors) {
            return;
        }
    }
};

//pass in the form data 

// export const editPostThunk = (formData, postId) => async (dispatch) => {
//     const response = await fetch(`/api/post/${postId}/edit`, {
//         method: 'PUT',
//         body: formData
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(editPost(data));
//     } else {
//         const errorData = await response.json();
//         if (errorData.errors) {
//             return;
//         }
//     }
// };

// export const deletePostThunk = (postId) => async (dispatch) => {
//     const response = await fetch(`/api/post/${postId}`, {
//         method: 'DELETE'
//     })
//     console.log("---------->", response)
//     if (response.ok) {
//         const data = await response.json()
//         dispatch(deletePost(postId))
//         console.log("---------------------->", data)

//         console.log("---------------------------->", data)


//     } else {
//         const errorData = await response.json();
//         if (errorData.errors) {
//             return;
//         }
//     }
// };




       




//reducer 
const initialState = { 
    allPosts: {},
    singlePost: {},
     
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            const newState = { ...state };
            newState.allPosts = action.posts
            return newState
        }
        case CREATE_POST: {
            const newState = { ...state, allPosts: {...state.allPosts}}
            newState.allPosts[action.post.id] = action.post
        }
        // case EDIT_POST: {
        //     console.log("ACTION----->",action);
        //     console.log("ACTION.TYPEEE----->",action.type);
        //     const newState = {...state}
        //     console.log("STATE----->",state);
        //     console.log("STATE.ALLPOSTS----->",state.allPosts);
        //     console.log("ACTION.POSTID----->",action.postId);
        //     newState.allPosts[action.postId.id] = action.postId
        //     return newState
        default: 
        return state;
        }
        // case DELETE_POST: {
        //     const newState = { ...state, allPosts: { ...state.allPosts } }
        //     delete newState.allPosts[action.postId]
        //     return newState
        // }

    }


