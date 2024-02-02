import React, { useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import profilePhoto from "../../../assets/images/user.png"
import { ProfileStatusWithHooks } from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";


const ProfileInfo = ({ isOwner, profile, status, updateStatus, savePhoto, saveProfile }) => {
  
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    )
  };

  return (
    <div>
      <img src="https://bogatyr.club/uploads/posts/2023-01/thumbs/1674852902_bogatyr-club-p-zvezdnoe-nebo-fon-fon-vkontakte-2.jpg" alt="content_picture" height={360} width={984}/>
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

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}
    </div>
  </div>
};

const Contact = ({contactTitle, contactValue}) => {
  return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
};


export default ProfileInfo;