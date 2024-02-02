import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
    "API-KEY": "f80c015d-5a1d-4b3c-b82d-9f7e51bcf80c"
    }   
});