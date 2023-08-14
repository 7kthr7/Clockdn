
const LOAD_LIKES = '/likes/LOAD_LIKES'
const CREATE_LIKE = '/likes/CREATE_LIKES'
const DELETE_LIKE = '/likes/DELETE_LIKE'

const getLikes = (likes) => ({
    type: LOAD_LIKES,
    likes
})

const createLikes = (like) => ({
    type: CREATE_LIKE,
    like
})

const deleteLike = (like) => ({
    type: DELETE_LIKE,
    like
})


export const getLikesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/like/`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getLikes(data))
        return data
    }
}

export const createLikeThunk = (postId, like) => async (dispatch) => {
    const response = await fetch(`/api/like/${postId}`, {
        method: 'POST',
        body: like
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(createLikes(data))
        dispatch(getLikesThunk())
        return data
    }
}

export const deleteLikeThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/like/${postId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteLike(postId))
    }
}

const initialState = {
    allLikes: {}
}

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case LOAD_LIKES: {
            const newState = {...state};
            newState.allLikes = action.likes
            return newState
        }
        case CREATE_LIKE: {
            const newState = {...state};
            newState.allLikes[action.like.id] = action.like
        }
        default: 
        return state
    }
}