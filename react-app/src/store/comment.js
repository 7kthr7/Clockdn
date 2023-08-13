const LOAD_COMMENTS = '/comment/LOAD_COMMENTS'
const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const EDIT_COMMENT = '/comment/EDIT_COMMENT'
const DELETE_COMMENT = '/comment/DELETE_COMMENT'

const getComments = (comments) => ({
    type: LOAD_COMMENTS, 
    comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const editComment = (commentId) => ({
    type: EDIT_COMMENT,
    commentId

})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
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

export const editCommentThunk = (comment, commentId) => async (dispatch) => {

    const response = await fetch(`/api/comment/edit/${commentId}`, { 
        method: 'PUT',
        body: comment
    })


    console.log("EDIT COMMENT RESPONSE ----------->", response)

    if (response.ok) {
        const data = await response.json()
        dispatch(editComment(data))
        dispatch(getCommentsThunk())
        return data
    }

}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteComment(commentId))
        dispatch(getCommentsThunk())
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
        case CREATE_COMMENT: {
            const newState = {...state, allComments: {...state.allComments}}
            newState.allComments[action.comment.id] = action.comment
        }
        case EDIT_COMMENT: {
            const newState = {...state}
            console.log("WHAT IS STATE -------------->", newState)
            newState.allComments[action.commentId] = action.commentId
            return newState
        }
        // case DELETE_COMMENT: {
        //     const newState
        // }
        default: 
        return state
    }
}