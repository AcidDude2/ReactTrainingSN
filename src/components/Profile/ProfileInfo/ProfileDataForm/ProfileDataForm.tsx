import React from "react";
import styles from "../ProfileInfo.module.css";
import style from "../../../../components/common/FormsControls/FormsControls.module.css";
import { createField, FormControl, GetStringKeys } from "../../../common/FormsControls/FormsControls.tsx";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "types/types.ts";


type PropsType = {
  profile: ProfileType
};

type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
  return <form onSubmit={handleSubmit}>
    <div><button>Save</button></div>
    {error && <div className={style.formSummaryError}>
      {error}
    </div>}
    <div>
      <b>Full name</b>:
      {createField<ProfileDataFormValuesTypeKeys>("fullName", "input", FormControl, "FullName", [])}
    </div>
    <div>
      <b>About me</b>:
      {createField<ProfileDataFormValuesTypeKeys>("aboutMe", "input", FormControl, "About me", [])}
    </div>
    <div>
      <b>Looking for a job</b>:
      {createField<ProfileDataFormValuesTypeKeys>("lookingForAJob", "input", FormControl, undefined, [], "checkbox")}
    </div>
    <div>
      <b>My professional skills</b>:
      {createField<ProfileDataFormValuesTypeKeys>("lookingForAJobDescription", "textarea", FormControl, "My professional skills", [])}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={styles.contact}>
          {/* Fix this part later (like "contacts." + key as "fullName") */}
          <b>{key}: {createField("contacts." + key, "input", FormControl, key, [])}</b>
        </div>
      })}
    </div>
  </form>
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;
