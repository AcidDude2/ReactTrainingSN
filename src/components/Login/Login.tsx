import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { FormControl, createField } from "../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/redux-store.ts";


const maxLength40 = maxLengthCreator(40);

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("email", "input", FormControl, "Email", [required, maxLength40])}
            {createField<LoginFormValuesTypeKeys>("password", "input", FormControl, "Password", [required], "password")}
            {createField<LoginFormValuesTypeKeys>("rememberMe", "input", FormControl, undefined, [], "checkbox", "Remember me")}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("captcha", "input", FormControl, "Symbols from captcha", [required])}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

type LoginFormOwnProps = {
    captchaUrl: string | null
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
};

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to="/profile" />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { login })(Login);