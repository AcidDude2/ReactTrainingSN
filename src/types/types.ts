export type PostType = {
  id: number
  message: string
  likesCount: number
};

export type ProfileType = {
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: PhotosType
  contacts: ContactsType
  aboutMe: string
};

export type ContactsType = {
  facebook: string
  website: string
  vk: string
  twitter: string
  instagram: string
  youtube: string
  github: string
  mainLink: string
};

export type PhotosType = {
  small: string | null
  large: string | null
};

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
};