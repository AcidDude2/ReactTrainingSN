import React from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}

let mapDispatchToProps = (dispatch) => {
}

export default connect (mapStateToProps, mapDispatchToProps)(Sidebar);