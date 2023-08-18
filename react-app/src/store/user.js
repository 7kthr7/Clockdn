

const LOAD_USERS = '/user/LOAD_USERS';
const LOAD_USER = '/user/LOAD_USER';
const LOAD_LIKES = '/user/LOAD_LIKES';
const LOAD_COMMENT = '/user/LOAD_COMMENT'
const CREATE_FOLLOW = '/user/CREATE_FOLLOW'
const DELETE_FOLLOW = '/user/DELETE_FOLLOW'

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

const getUserComments = (comments) => ({
    type: LOAD_COMMENT, 
    payload: comments
})

const followUser = (userId) => ({
    type: CREATE_FOLLOW,
    payload: userId
})
const unfollowUser = (userId) => ({
    type: DELETE_FOLLOW,
    payload: userId
})


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

export const getUserCommentsThunk = () => async (dispatch) => {
    const response = await fetch("/api/comment/user");

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserComments(data));
    } else {
        console.error('Failed to fetch user Comments.');
    }
};


export const followUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
        headers: {
			"Content-Type": "application/json",
		},
        body: userId 
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(followUser(userId))
        return data
    }
}
export const unfollowUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(unfollowUser(userId))
        return data
    }
}




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
        case LOAD_COMMENT: {
            return {
                ...state,
                userActivity: action.payload
            };
        }
        default:
            return state;
    }
}
