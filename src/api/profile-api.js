import { instance } from "./instance";


export const profileAPI = {
    getProfile(userId = 2) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    }
}