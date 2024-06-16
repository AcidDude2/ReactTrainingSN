import { PhotosType, ProfileType } from "../types/types";
import { APIResponseType, instance } from "./instance.ts";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    async getProfile(userId: number) {
        const res = await instance.get<ProfileType>(`profile/` + userId);
        return res.data;
    },
    async getStatus(userId: number) {
        const res = await instance.get<string>(`profile/status/` + userId);
        return res.data;
    },
    async updateStatus(status: string) {
        const res = await instance.put<APIResponseType>(`profile/status`, { status: status });
        return res.data;
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const res = await instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    },
    async saveProfile(profile: ProfileType) {
        const res = await instance.put(`profile`, profile);
        return res.data;
    }
};