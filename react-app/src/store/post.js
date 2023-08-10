//action 
const GET_POSTS = "/post/GET_POST"
const CREATE_POST = "/post/CREATE_POST"

//action creator

const getPost = (posts) => ({
    type: GET_POSTS,
    posts
   
})

const addPost = (post) => ({
    type: CREATE_POST,
    post
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
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addPost(data));
    } else {
        const errorData = await response.json();
        if (errorData.errors) {
            return;
        }
    }
};


        // dispatch(getPostsThunk());




//reducer 
const initialState = { 
    posts: {},
    singlePost: {},
     
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            const newState = { ...state };
            newState.posts = action.posts
            return newState
        }
        case CREATE_POST: {
            const newState = { ...state, posts: {...state.alls}}
            newState.posts[action.post.id] = action.post
        }
        default:
            return state
    }
}

