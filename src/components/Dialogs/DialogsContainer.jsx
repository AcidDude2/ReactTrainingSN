import React from "react";
import Dialogs from "./Dialogs";
import { sendMessageCreator } from "../../redux/dialog-reducer.ts";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        // users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}
  

export default compose(withAuthRedirect,connect(mapStateToProps, mapDispatchToProps))(Dialogs);