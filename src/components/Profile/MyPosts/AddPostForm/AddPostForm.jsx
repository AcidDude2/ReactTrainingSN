import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators/validators.ts";
import { FormControl } from "../../../common/FormsControls/FormsControls.tsx";


const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Enter post text"} name={"newPostText"} component={FormControl} child={"textarea"} validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

export const AddNewPostReduxForm = reduxForm({ form: "profileAddPostForm" })(AddNewPostForm);