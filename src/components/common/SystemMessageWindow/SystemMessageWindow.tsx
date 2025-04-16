import React from "react";
import styles from "../SystemMessageWindow/SystemMessageWindow.module.css";
import { connect } from "react-redux";
import { hideSystemMessage } from "../../../redux/profile-reducer.ts";
import { AppStateType } from "redux/redux-store.ts";


type MapPropsType = {
    hasError: boolean
    systemMessage: string
};

type DispatchPropsType = {
    hideSystemMessage: () => void
}

const SystemMessageWindow: React.FC<MapPropsType & DispatchPropsType> = (props) => {
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

const mapStateToProps = (state: AppStateType) => {
    return {
        hasError: state.profilePage.hasError,
        systemMessage: state.profilePage.systemMessage
    } as MapPropsType
};

let SystemMessageWindowContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { hideSystemMessage })(SystemMessageWindow);

export default SystemMessageWindowContainer;