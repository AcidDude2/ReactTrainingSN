import React, { ChangeEvent, useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import profilePhoto from "../../../assets/images/user.png"
import { ProfileStatusWithHooks } from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";
import { ContactsType, ProfileType } from "types/types";


type PropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
};

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
};

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
};

const ProfileInfo: React.FC<PropsType> = ({ isOwner, profile, status, updateStatus, savePhoto, saveProfile }) => {
  
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  };

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    )
  };

  return (
    <div>
      <div className={styles.descriptionBlock}>
        <img src={profile.photos.large != null ? profile.photos.large : profilePhoto} className={styles.profilePhoto} />
        <div>
          {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        </div>
        {editMode 
        ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
        : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
        <div>
          <ProfileStatusWithHooks isOwner={isOwner} status={status} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  )
};

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
      })}
    </div>
  </div>
};

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
};

export default ProfileInfo;