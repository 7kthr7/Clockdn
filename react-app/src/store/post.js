//action 
const GET_POSTS = "/post/GET_POST"
const CREATE_POST = "/post/CREATE_POST"
const EDIT_POST = "/post/EDIT_POST"

//action creator

const getPost = (posts) => ({
    type: GET_POSTS,
    posts
   
})

const addPost = (post) => ({
    type: CREATE_POST,
    post
})

const editPost = (postId) => ({
    type: EDIT_POST,
    postId
})


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

export const editPostThunk = (postId, post) => async (dispatch) => {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: post
    })
        console.log("---------->", response)
    if (response.ok) {
        const data = await response.json();
        console.log("---------------------->", data)
        dispatch(editPost(data));
        dispatch(getPostsThunk())
        console.log("---------------------------->", data)
    } else {
        const errorData = await response.json();
        if (errorData.errors) {
            return;
        }
    }
};

       




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
        case EDIT_POST: {
            return { ...state, allPosts: { ...state.allPosts, [action.postId]: { post: action.post} } };
            // const newState = {...state}
            // newState.allPosts[action.postId.id] = action.postId
            // return newState
        }
        // case DELETE_POST: {
        //     const newState = { ...state, allPosts: { ...state.allPosts } }
        //     delete newState.allPosts[action.postId]
        //     return newState
        // }
        default: return state
    }
}
