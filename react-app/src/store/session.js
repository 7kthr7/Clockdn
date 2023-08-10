// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, email, city, state, occupation, biography, profileImage, password) => async (dispatch) => {
	console.log('Input Data:', profileImage)
	const newUser = new FormData();
	
	newUser.append('first_name', firstName);
	newUser.append('last_name', lastName);
	newUser.append('email', email);
	newUser.append('city', city);
	newUser.append('state', state);
	newUser.append('occupation', occupation);
	newUser.append('biography', biography);
	newUser.append('profile_image', profileImage);
	newUser.append('password', password);

	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: newUser
	});

	if (response.ok) {
		const data = await response.json();
		// console.log('RETURN DATA',data)
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const editUserThunk = (firstName, lastName, email, city, state, occupation, biography, profileImage, password) => async (dispatch) => {
	console.log('Input Data:', profileImage)
	const editUser = new FormData();
	
	editUser.append('first_name', firstName);
	editUser.append('last_name', lastName);
	editUser.append('email', email);
	editUser.append('city', city);
	editUser.append('state', state);
	editUser.append('occupation', occupation);
	editUser.append('biography', biography);
	editUser.append('profile_image', profileImage);
	editUser.append('password', password);

	const response = await fetch(`/api/users/${id}`, {
		method: "PUT",
		body: editUser
	});

	if (response.ok) {
		const data = await response.json();
		// console.log('RETURN DATA',data)
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}