import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { FormControl, GetStringKeys, createField } from "../../common/FormsControls/FormsControls.tsx";
import { required, maxLengthCreator } from "../../utils/validators/validators.ts";
import { newMessageFormValuesType } from "../Dialogs.tsx";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<newMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            {createField<NewMessageFormValuesTypeKeys>("newMessageBody", "textarea", FormControl, "Enter new message", [required, maxLength50])}
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

type NewMessageFormValuesTypeKeys = GetStringKeys<newMessageFormValuesType>;
type PropsType = {};

export const AddMessageReduxForm = reduxForm<newMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm);