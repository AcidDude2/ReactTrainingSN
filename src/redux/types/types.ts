export type PostType = {
  id: number
  message: string
  likesCount: number
};

export type ProfileType = {
  fullName: string
  lookingForAJob: boolean
  lookingForAJobdescription: string
  photos: PhotosType
  contacts: ContactsType
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
  id: string
  name: string
  status: string
  photos: PhotosType
};