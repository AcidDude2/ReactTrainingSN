import { instance } from "./instance.ts";


export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type AuthorizeMeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodes
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>
}

export const authAPI = {
    authorizeMe() {
        return instance.get<AuthorizeMeResponseType>(`auth/me`).then(res => res.data);
    },

    async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        const res = await instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },

    logout() {
        return instance.delete(`auth/login`)
    }
}