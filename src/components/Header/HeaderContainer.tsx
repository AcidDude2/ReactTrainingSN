import React from "react";
import Header, {MapPropsType, DispatchPropsType} from "./Header.tsx";
import { logout } from "../../redux/auth-reducer.ts";
import { connect } from "react-redux";
import { AppStateType } from "redux/redux-store.ts";


const HeaderContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    {
        return <Header {...props} />
    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
} as MapPropsType);


export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);