import { instance, ResultCodesEnum, ResultCodeForCaptchaEnum, APIResponseType } from "./instance.ts";


type AuthorizeMeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    async authorizeMe() {
        const res = await instance.get<APIResponseType<AuthorizeMeResponseDataType>>(`auth/me`);
        return res.data;
    },

    async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        const res = await instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },

    logout() {
        return instance.delete(`auth/login`);
    }
}