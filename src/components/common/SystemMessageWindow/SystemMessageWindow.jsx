import React from "react";
import styles from "../SystemMessageWindow/SystemMessageWindow.module.css";
import { connect } from "react-redux";
import { hideSystemMessage } from "../../../redux/profile-reducer.ts";


const SystemMessageWindow = (props) => {
    return (
        <div className={props.hasError ? styles.activeSystemMessage : styles.inactiveSystemMessage}>
            <div className={props.hasError ? styles.activeSystemMessageWindow : styles.inactiveSystemMessageWindow} onClick={e => e.stopPropagation()}>
                <h1 className={styles.errorHeader}>Error</h1>
                <h3 className={styles.errorText}>{props.systemMessage}</h3>
                <div className={styles.errorButton}>
                <button onClick={() => props.hideSystemMessage()}>OK</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        hasError: state.profilePage.hasError,
        systemMessage: state.profilePage.systemMessage
    }
};

let SystemMessageWindowContainer = connect(mapStateToProps, { hideSystemMessage })(SystemMessageWindow);


export default SystemMessageWindowContainer;