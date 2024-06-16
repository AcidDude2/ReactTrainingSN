import { profileAPI } from "../api/profile-api.ts";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "./../types/types";
import { BaseThunkType, InferActionsType } from "./redux-store.ts";

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

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE-REDUCER/ADD_POST": {
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
        case "SN/PROFILE-REDUCER/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SN/PROFILE-REDUCER/TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "SN/PROFILE-REDUCER/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "SN/PROFILE-REDUCER/DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case "SN/PROFILE-REDUCER/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }
        case "SN/PROFILE-REDUCER/SET_SYSTEM_MESSAGE_WINDOW_ACTIVE": {
            return { ...state, hasError: action.hasError }
        }
        case "SN/PROFILE-REDUCER/FORM_SYSTEM_MESSAGE": {
            return { ...state, systemMessage: action.systemMessage }
        }
        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: "SN/PROFILE-REDUCER/ADD_POST", newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SN/PROFILE-REDUCER/SET_USER_PROFILE", profile } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "SN/PROFILE-REDUCER/TOGGLE_IS_FETCHING", isFetching } as const),
    setStatus: (status: string) => ({ type: "SN/PROFILE-REDUCER/SET_STATUS", status } as const),
    deletePost: (postId: number) => ({ type: "SN/PROFILE-REDUCER/DELETE_POST", postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SN/PROFILE-REDUCER/SAVE_PHOTO_SUCCESS", photos } as const),
    setSystemMessageWindowActive: (hasError: boolean) => ({ type: "SN/PROFILE-REDUCER/SET_SYSTEM_MESSAGE_WINDOW_ACTIVE", hasError } as const),
    formSystemMessage: (systemMessage: string) => ({ type: "SN/PROFILE-REDUCER/FORM_SYSTEM_MESSAGE", systemMessage } as const)
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setUserProfile(data));
    dispatch(actions.toggleIsFetching(false));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        let errorResponse: number = error.response.status;
        dispatch(errorHandler(errorResponse, true));
    }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        }
        else {
            throw new Error("User id can't be null")
        }
    } else {
        const errorMessage = data.messages[0];
        let contactName = errorMessage.split('>')[1].split(')')[0];
        let modifiedContactName = contactName.toLowerCase();
        dispatch(stopSubmit('edit-profile', { "contacts": { [modifiedContactName]: "Ошибка в URL: " + contactName } }));
        return Promise.reject(data.messages[0]);
    }
};

export const errorHandler = (errorResponse: number | null, hasError: boolean): ThunkType => async (dispatch) => {
    dispatch(identifySystemMessage(errorResponse));
    dispatch(actions.setSystemMessageWindowActive(hasError));
};

export const identifySystemMessage = (errorCode: number | null): ThunkType => async (dispatch) => {
    if (errorCode === 500) {
        dispatch(actions.formSystemMessage("Code 500: Internal server error"));
    }
    if (errorCode === 403) {
        dispatch(actions.formSystemMessage("Code 403: Forbidden"));
    }
    if (errorCode === 404) {
        dispatch(actions.formSystemMessage("Code 404: Page not found"));
    }
};

export const hideSystemMessage = (): ThunkType => async (dispatch) => {
    dispatch(actions.setSystemMessageWindowActive(false));
    dispatch(identifySystemMessage(null));
};

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>;

export default profileReducer;