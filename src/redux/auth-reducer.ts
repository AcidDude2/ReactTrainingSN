import { stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api.ts";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/instance.ts";
import { securityAPI } from "../api/security-api.ts";
import { BaseThunkType, InferActionsType } from "./redux-store.ts";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/AUTH-REDUCER/SET_AUTH_USER_DATA":
        case "SN/AUTH-REDUCER/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: "SN/AUTH-REDUCER/SET_AUTH_USER_DATA", payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: "SN/AUTH-REDUCER/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}} as const)
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const authorizeMeData = await authAPI.authorizeMe();
    if (authorizeMeData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = authorizeMeData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const urlData = securityAPI.getCaptchaUrl();
    const captchaUrl = (await urlData).url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType <typeof stopSubmit>>;
export type InitialStateType = typeof initialState;

export default authReducer;