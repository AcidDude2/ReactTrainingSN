import { profileAPI } from "../api/profile-api";
import { stopSubmit } from "redux-form";


const ADD_POST = "SN/profile-reducer/ADD_POST";
const SET_USER_PROFILE = "SN/profile-reducer/SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "SN/profile-reducer/TOGGLE_IS_FETCHING'";
const SET_STATUS = "SN/profile-reducer/SET_STATUS'";
const DELETE_POST = "SN/profile-reducer/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SN/profile-reducer/SAVE_PHOTO_SUCCESS";
const SET_SYSTEM_MESSAGE_WINDOW_ACTIVE = "SN/profile-reducer/SET_SYSTEM_MESSAGE_WINDOW_ACTIVE";
const FORM_SYSTEM_MESSAGE = "SN/profile-reducer/FORM_SYSTEM_MESSAGE"

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 20 },
        { id: 2, message: "It's my first message", likesCount: 30 }
    ],
    profile: null,
    isFetching: false,
    status: "",
    hasError: false,
    systemMessage: ""
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }
        }
        case SET_SYSTEM_MESSAGE_WINDOW_ACTIVE: {
            return { ...state, hasError: action.hasError }
        }
        case FORM_SYSTEM_MESSAGE: {
            return { ...state, systemMessage: action.systemMessage }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });
export const setSystemMessageWindowActive = (hasError) => ({ type: SET_SYSTEM_MESSAGE_WINDOW_ACTIVE, hasError });
export const formSystemMessage = (systemMessage) => ({ type: FORM_SYSTEM_MESSAGE, systemMessage });


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
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        let errorResponse = error.response.status;
        dispatch(identifySystemMessage(errorResponse));
        dispatch(setSystemMessageWindowActive(true));
    }
};

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        const errorMessage = response.data.messages[0];
        let contactName = errorMessage.split('>')[1].split(')')[0];
        let modifiedContactName = contactName.toLowerCase();
        dispatch(stopSubmit('edit-profile', { "contacts": { [modifiedContactName]: "Ошибка в URL: " + contactName } }));
        return Promise.reject(response.data.messages[0]);
    }
};

export const identifySystemMessage = (errorCode) => async (dispatch) => {
    if (errorCode === 500) {
        dispatch(formSystemMessage("Code 500: Internal server error"));
    }
    if (errorCode === 403) {
        dispatch(formSystemMessage("Code 403: Forbidden"));
    }
    if (errorCode === 404) {
        dispatch(formSystemMessage("Code 404: Page not found"));
    }
};

export const hideSystemMessage = () => async (dispatch) => {
        dispatch(setSystemMessageWindowActive(false));
        dispatch(identifySystemMessage(null));
}


export default profileReducer;