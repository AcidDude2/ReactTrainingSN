import axios from "axios";
import { UserType } from "../types/types";


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
};

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
};

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
    "API-KEY": "f80c015d-5a1d-4b3c-b82d-9f7e51bcf80c"
    }   
});