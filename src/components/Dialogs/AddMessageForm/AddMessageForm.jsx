import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormControl } from "../../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";


const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Enter your message"} name={"newMessageBody"} component={FormControl} child={"textarea"} validate={[required, maxLength50]} />
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}


export const AddMessageReduxForm = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);