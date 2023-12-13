import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import profilePhoto from "../../../assets/images/user.png"
import { ProfileStatusWithHooks } from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <img src="https://bogatyr.club/uploads/posts/2023-01/thumbs/1674852902_bogatyr-club-p-zvezdnoe-nebo-fon-fon-vkontakte-2.jpg" alt="content_picture" height={360} width={985} />
      <div className={styles.descriptionBlock}>
        <img src={profile.photos.large != null ? profile.photos.large : profilePhoto} className={styles.profilePhoto} />
        <div>
          {profile.fullName}
        </div>
        <div>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>
      <div>
        {profile.aboutMe}
      </div>
    </div>
  )
}

export default ProfileInfo;