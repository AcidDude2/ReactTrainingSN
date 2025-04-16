import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { FormControl, GetStringKeys, createField } from "../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../utils/validators/validators.ts";
import { Navigate } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { AppDispatchType, AppStateType } from "../../redux/redux-store.ts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
};

type LoginFormOwnProps = {
    captchaUrl: string | null
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);

export const Login: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch: AppDispatchType = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to="/profile" />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
};