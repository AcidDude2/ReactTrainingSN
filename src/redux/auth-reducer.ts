import { stopSubmit } from "redux-form";
import { ResultCodeForCaptcha, ResultCodes, authAPI } from "../api/auth-api.ts";
import { securityAPI } from "../api/security-api.ts";
import { Dispatch } from 'redux';
import { AppStateType } from './redux-store.ts';
import { ThunkAction } from 'redux-thunk';


const SET_AUTH_USER_DATA = "SN/auth-reducer/SET_AUTH_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "SN/auth-reducer/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState;

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataPayloadType
};

type SetAuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
};

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
};

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;
type DispatchType = Dispatch<ActionsTypes>;
type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    const authorizeMeData = await authAPI.authorizeMe();
    if (authorizeMeData.resultCode === ResultCodes.Success) {
        let { id, login, email } = authorizeMeData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
};

export const logout = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    const urlData = await securityAPI.getCaptchaUrl();
    const captchaUrl = urlData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};


export default authReducer;