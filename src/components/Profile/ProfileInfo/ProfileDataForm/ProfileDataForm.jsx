import React from "react";
import styles from "../ProfileInfo.module.css";
import style from "../../../../components/common/FormsControls/FormsControls.module.css";
import { createField } from "../../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import { FormControl } from "../../../common/FormsControls/FormsControls";


const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return <form onSubmit={handleSubmit}>
    <div><button>Save</button></div>
    {error && <div className={style.formSummaryError}>
      {error}
    </div>}
    <div>
      <b>Full name</b>:
      {createField("Full name", "fullName", "input", null, FormControl)}
    </div>
    <div>
      <b>About me</b>:
      {createField("About me", "aboutMe", "input", null, FormControl)}
    </div>
    <div>
      <b>Looking for a job</b>:
      {createField(null, "lookingForAJob", "input", null, FormControl, { type: "checkbox" })}
    </div>
    <div>
      <b>My professional skills</b>:
      {createField("My professional skills", "lookingForAJobDescription", "textarea", null, FormControl)}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={styles.contact}>
          <b>{key}: {createField(key, "contacts." + key, "input", null, FormControl)}</b>
        </div>
      })}
    </div>
  </form>
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm);


export default ProfileDataFormReduxForm;
