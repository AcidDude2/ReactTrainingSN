import React from "react";
import style from "./FormsControls.module.css"
import { Field } from "redux-form";


export const FormControl = ({ input, meta, ...restProps }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${style.formControl} ${hasError && style.error}`}>
            <div>
                <restProps.child {...restProps} {...input} {...meta} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder, name, child, validators, component, props={}, text = "") => {
    return (
    <div>
        <Field placeholder={placeholder} name={name} child={child} validate={validators} component={component} {...props}/>{text}
    </div>)
}