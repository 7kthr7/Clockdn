// const LOAD_USERS = '/user/LOAD_USERS'
// const LOAD_USER = '/user/LOAD_USER'
// const LOAD_LIKES = '/user/LOAD_LIKES'

// const getUsers = (payload) => ({
//     type: LOAD_USERS,
//     payload
// })

// const getUser = (user) => ({
//     type: LOAD_USER,
//     user

// })
// const getUserLikes = (likes) => ({
//     type: LOAD_LIKES,
//     likes

// })

// export const getUserThunk = () => async (dispatch) => {
//     const response = await fetch("/api/users/");

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(getUsers(data))
//         return data
//     }
// }

// export const getSingleUserThunk = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}`)

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(getUser(data))
//     }
// }

// export const getUserLikesThunk = () => async (dispatch) => {
//     const response = await fetch("/api/like/user")

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(getUserLikes(data))
//     }
// }

// const initialState = {
//     allUser: {},
//     singleUser: {},
//     userActivity: []
// }

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case LOAD_USERS: {
//             const newState = {...state }; 
//             newState.allUser = action.payload
//             return newState
//         }
//         case LOAD_USER: {
//             const newState = { ...state, allUser: {}, singleUser: {}}
//             newState.singleUser = action.user
//             return newState
//         }
//         case LOAD_LIKES: {
//             return {
//                 ...state,
//                 userActivity: action.payload.likes
//             }
//         }


//         default:
//             return state;

//     }
// }

const LOAD_USERS = '/user/LOAD_USERS';
const LOAD_USER = '/user/LOAD_USER';
const LOAD_LIKES = '/user/LOAD_LIKES';

const getUsers = (users) => ({
    type: LOAD_USERS,
    payload: users
});

const getUser = (user) => ({
    type: LOAD_USER,
    payload: user
});

const getUserLikes = (likes) => ({
    type: LOAD_LIKES,
    payload: likes
});

export const getUserThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getUsers(data));
        return data;
    } else {
        console.error('Failed to fetch users.');
    }
};

export const getSingleUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getUser(data));
    } else {
        console.error(`Failed to fetch user with ID ${userId}.`);
    }
};

export const getUserLikesThunk = () => async (dispatch) => {
    const response = await fetch("/api/like/user");

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserLikes(data));
    } else {
        console.error('Failed to fetch user likes.');
    }
};

const initialState = {
    allUser: {},
    singleUser: {},
    userActivity: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERS: {
            return {
                ...state,
                allUser: action.payload
            };
        }
        case LOAD_USER: {
            return {
                ...state,
                singleUser: action.payload
            };
        }
        case LOAD_LIKES: {
            return {
                ...state,
                userActivity: action.payload
            };
        }
        default:
            return state;
    }
}
