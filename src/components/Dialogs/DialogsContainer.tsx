import React from "react";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import { actions } from "../../redux/dialog-reducer.ts";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.ts";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {...actions}), withAuthRedirect)(Dialogs);