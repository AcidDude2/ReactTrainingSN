import { ThunkAction } from 'redux-thunk';
import { profileAPI } from "../api/profile-api.ts";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "./types/types.ts";
import { Dispatch } from "redux";
import { AppStateType } from "./redux-store.ts";


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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    isFetching: false as boolean,
    status: "" as string | null,
    hasError: false as boolean,
    systemMessage: "" as string | null,
    newPostText: "" as string | null
};

type InitialStateType = typeof initialState;

const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
                profile: { ...state.profile, photos: action.photos } as ProfileType
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

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
};

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
};

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type ToggleIsFetcjingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetcjingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
};

export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
};

export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type SetSystemMessageWindowActiveActionType = {
    type: typeof SET_SYSTEM_MESSAGE_WINDOW_ACTIVE
    hasError: boolean
};

export const setSystemMessageWindowActive = (hasError: boolean): SetSystemMessageWindowActiveActionType => ({ type: SET_SYSTEM_MESSAGE_WINDOW_ACTIVE, hasError });

type formSystemMessageActionType = {
    type: typeof FORM_SYSTEM_MESSAGE
    systemMessage: string
};

export const formSystemMessage = (systemMessage: string): formSystemMessageActionType => ({ type: FORM_SYSTEM_MESSAGE, systemMessage });

type ActionsTypes = AddPostActionCreatorActionType | SetUserProfileActionType | ToggleIsFetcjingActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType | SetSystemMessageWindowActiveActionType | formSystemMessageActionType;
type DispatchType = Dispatch<ActionsTypes>;
type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(toggleIsFetching(true));
    dispatch(setUserProfile(response.data));
    dispatch(toggleIsFetching(false));
};

export const getStatus = (userId: number): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        let errorResponse = error.response.status;
        dispatch(errorHandler(errorResponse, true));
    }
};

export const savePhoto = (file: any):  ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
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

export const errorHandler = (errorResponse: number | null, hasError: boolean): ThunkType => async(dispatch: DispatchType, getState: GetStateType) => {
    dispatch(identifySystemMessage(errorResponse));
    dispatch(setSystemMessageWindowActive(hasError));
};

export const identifySystemMessage = (errorCode: number | null): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
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

export const hideSystemMessage = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(setSystemMessageWindowActive(false));
        dispatch(identifySystemMessage(null));
};


export default profileReducer;