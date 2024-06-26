import { APIResponseType, GetItemsType, instance } from "./instance.ts";


export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },
    async follow(userId: number) {
        const res = await instance.post<APIResponseType>(`follow/${userId}`);
        return res.data;
    },
    async unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
};