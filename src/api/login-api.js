import { instance } from "./instance";

export const loginAPI = {
    authorizeMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    }
}