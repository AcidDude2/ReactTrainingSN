import React from "react";
import { reduxForm } from "redux-form";
import { FormControl } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { createField } from "../common/FormsControls/FormsControls";


const maxLength40 = maxLengthCreator(40);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", "input", [required, maxLength40], FormControl)}
            {createField("Password", "password", "input", [required], FormControl, { type: "password" })}
            {createField(null, "rememberMe", "input", null, FormControl, { type: "checkbox" }, "Remember me")}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from captcha", "captcha", "input", [required], FormControl)}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { login })(Login);