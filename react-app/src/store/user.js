const LOAD_USERS = '/user/LOAD_USERS'
const LOAD_USER = '/user/LOAD_USER'
// const EDIT_USER = '/user/EDIT_USER'

const getUsers = (payload) => ({
    type: LOAD_USERS,
    payload
})

const getUser = (user) => ({
    type: LOAD_USER,
    user

})

// const editUser = (userId) => ({
//     type: EDIT_USER,
//     userId
// })


export const getUserThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getUsers(data))
        return data
    }
}

export const getSingleUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getUser(data))
        dispatch(getSingleUserThunk())
    }
}

// export const editUserThunk = (formData, userId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}`, {
//         method: 'PUT',
//         body: formData
//     })
//     if (response.ok) {
//         const data = await response.json()
//         dispatch(editUser(data));
//         return data
//     }

// }


const initialState = {
    allUser: {},
    singleUser: {}
}

// Normalize data here 

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERS: {
            // const newState = { ...state, allUser: {} }
            // action.users.forEach((user) => {
            //     newState.allUser[user.id] = user
            // })
            // return newState
            const newState = {...state }; 
            newState.allUser = action.payload
            return newState
        }
        case LOAD_USER: {
            const newState = { ...state, allUser: {}, singleUser: {}}
            newState.singleUser = action.user
            return newState
        }
        // case EDIT_USER: {
        //     const newState = {...state}
        //     newState.allUser[action.userId] = action.userId
        // }

        default:
            return state;

    }
}