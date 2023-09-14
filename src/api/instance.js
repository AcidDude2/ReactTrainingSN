import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
    "API-KEY": "90d04925-463f-418a-8bdb-3335fcfe2c4c"
    }   
});