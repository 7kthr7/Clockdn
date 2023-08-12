const LOAD_COMMENTS = '/comment/LOAD_COMMENTS'

const getComments = (comments) => ({
    type: LOAD_COMMENTS, 
    comments
})


export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comment/')
    
    console.log("Fetching comments for post_id:---->", response);
    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data))
        return data
    }
}

const initialState = {
    allComments: {}
}


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_COMMENTS: {
            const newState = {...state};
            newState.allComments = action.comments
            return newState
        }
        default: 
        return state
    }
}