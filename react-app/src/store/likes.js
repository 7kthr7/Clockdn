
const LOAD_LIKES = '/likes/LOAD_LIKES'

const getLikes = (likes) => ({
    type: LOAD_LIKES,
    likes
})

export const getLikesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/like/`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getLikes(data))
        return data
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
        default: 
        return state
    }
}