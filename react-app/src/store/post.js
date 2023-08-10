//action 
const GET_POSTS = "/post/GET_POST"

//action creator

const getPost = (posts) => ({
    type: GET_POSTS,
    posts
   
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


//reducer 
const initialState = { 
    posts: {} 
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            const newState = { ...state };
            newState.posts = action.posts
            return newState
        }
        default:
            return state
    }
}

