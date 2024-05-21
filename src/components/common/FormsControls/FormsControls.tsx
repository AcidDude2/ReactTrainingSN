import React from "react";
import style from "./FormsControls.module.css"
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValiatorType } from "../../utils/validators/validators.ts";

type FormControlPropsType = {
    name: string
    child: "input" | "textarea" | "select"
    placeholder: string| undefined
    validators: Array<FieldValiatorType>
    type?: string
    text?: string
    value?: string
}

export const FormControl: React.FC<FormControlPropsType & WrappedFieldProps> = ({ input, meta, ...restProps }) => {
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

export function createField<FormKeysType extends string> (name: FormKeysType, child: "input" | "textarea" | "select", component: React.FC<FormControlPropsType & WrappedFieldProps>, placeholder: string| undefined, validators: Array<FieldValiatorType>, type?: string, text?: string, value?: string, props={}) {
    return (
    <div>
        {text}<Field name={name} child={child} component={component} placeholder={placeholder} validate={validators} type={type} value={value} {...props}/>
    </div>)
}