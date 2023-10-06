import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormControl } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"


const maxLength20 = maxLengthCreator(20)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={FormControl} child={"input"} validate={[required, maxLength20]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} component={FormControl} child={"input"} validate={[required, maxLength20]} />
            </div>
            <div>
                <Field name={"rememberMe"} component={FormControl} child={"input"} type={"checkbox"} /> Remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to="/profile" />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { login })(Login);