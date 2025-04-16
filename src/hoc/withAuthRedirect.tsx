import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType): MapPropsType => ({
    isAuth: state.auth.isAuth
});

export function withAuthRedirect<WCP extends MapPropsType>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & RouterPropsType> = (props) => {
        let {isAuth, router, ...restProps} = props
        if (props.isAuth) {
            return <WrappedComponent {...restProps as WCP} />
        } else if (!props.isAuth && !props.router) {
            return <Navigate to='/login' />
        } else {
            if (!props.isAuth && !props.router.params.userId) {
                return <Navigate to='/login' />
            } else {
                if (!props.isAuth && props.router.params.userId) return <WrappedComponent {...restProps as WCP} />
            }
        }
    }
    return connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)((RedirectComponent));
};

type MapPropsType = {
    isAuth: boolean
};

type RouterPropsType = {
    router: {
        params: {
            userId: number
        }
    }
};