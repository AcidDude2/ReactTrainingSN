import { profileAPI } from "../api/profile-api";

const ADD_POST = "SN/profile-reducer/ADD_POST";
const SET_USER_PROFILE = "SN/profile-reducer/SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "SN/profile-reducer/TOGGLE_IS_FETCHING'";
const SET_STATUS = "SN/profile-reducer/SET_STATUS'";
const DELETE_POST = "SN/profile-reducer/DELETE_POST";


let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 20 },
        { id: 2, message: "It's my first message", likesCount: 30 }
    ],
    profile: null,
    isFetching: false,
    status: "Hello world"
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(toggleIsFetching(true));
    dispatch(setUserProfile(response.data));
    dispatch(toggleIsFetching(false));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};


export default profileReducer;