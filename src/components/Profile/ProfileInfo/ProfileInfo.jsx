import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import profilePhoto from "../../../assets/images/user.png"

const ProfileInfo = (props) => {
  console.log(props.profile)
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiSL9x1FiCIGJLFxEAKOSNf7nHlNzKgobWk2ch1UU7UWX5VSdH8JikVt3ZvhbEyZi1aG4&usqp=CAU' alt='content_picture' height={400} width={800} />
      <div className={styles.descriptionBlock}>
      <img src={props.profile.photos.large != null ? props.profile.photos.large : profilePhoto} className={styles.profilePhoto} />
        <div>
            {props.profile.fullName}
        </div>
      </div>
        <div>
            {props.profile.aboutMe}
        </div>
    </div>
  )
}

export default ProfileInfo;