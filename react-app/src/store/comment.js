const LOAD_COMMENTS = '/comment/LOAD_COMMENTS'
const CREATE_COMMENT = 'comment/CREATE_COMMENT'

const getComments = (comments) => ({
    type: LOAD_COMMENTS, 
    comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})


export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comment/')
    
    // console.log("Fetching comments for post_id:---->", response);
    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data))
        return data
    }
}

export const createCommentThunk = (postId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comment/${postId}`, {
        method: 'POST',
        body: comment
    })

    console.log("CREATING comments for post_id:---->", response);
    console.log("CREATING comments for post_id:---->", comment);

    if (response.ok) {
        const data = await response.json()
        dispatch(createComment(data))
        dispatch(getCommentsThunk())
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
        case CREATE_COMMENT: {
            const newState = {...state, allComments: {...state.allComments}}
            newState.allComments[action.comment.id] = action.comment
        }
        default: 
        return state
    }
}