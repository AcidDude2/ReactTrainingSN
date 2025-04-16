import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators/validators.ts";
import { createField, FormControl } from "../../../common/FormsControls/FormsControls.tsx";
import { GetStringKeys } from "../../../common/FormsControls/FormsControls.tsx";


type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const maxLength100 = maxLengthCreator(100);

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>("newPostText", "input", FormControl, "Your post", [required, maxLength100])}
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: "profileAddPostForm" })(AddNewPostForm);