//action 
const LOAD_POSTS = "post/LOAD_POSTS"
const LOAD_POST = "posts/LOAD_POST"
const CREATE_POST = "post/CREATE_POST"
const EDIT_POST = "post/EDIT_POST"
// const DELETE_POST = 'post/DELETE_POST'

//action creator

const getPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
   
})

const getPost = (post) => ({
    type: LOAD_POST,
    post
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
    // console.log("---------> CREATE POST THUNK", response)
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getPosts(data));
    }
}

export const getSinglePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/post/${postId}`);
    
    if (response.ok) {
		const data = await response.json();
        dispatch(getPost(data));
		
        return data
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

export const editPostThunk = (postId, FormData) => async (dispatch) => {
    const response = await fetch(`/api/post/edit/${postId}`, {
        method: 'PUT',
        body: FormData
    });
    console.log("EDIT ---------->", FormData)

    if (response.ok) {
        const data = await response.json();
        console.log('UPDATED RESPONSE', data)
        dispatch(addPost(FormData));
        return data;
    }
   
};

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
        case LOAD_POSTS: {
            const newState = { ...state };
            newState.allPosts = action.posts
            return newState
        }
        case LOAD_POST: {
            console.log("ACTION----->",action);
            console.log("ACTION.TYPEEE----->",action.type);
            const newState = { ...state, allPosts: {}, singlePost: {} };
            console.log("STATE----->",state);
            console.log("STATE.SINGLEPOSTS----->",state.singlePost)
            newState.singlePost = action.post
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
        // }
        default: 
        return state;
        }
     

    }



