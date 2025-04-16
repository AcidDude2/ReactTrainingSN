import React from "react";
import styles from "./Dialogs.module.css";
import DialogMember from "./DialogMember/DialogMember.tsx";
import DialogItem from "./DialogItem/DialogItem.tsx";
import { AddMessageReduxForm } from "./AddMessageForm/AddMessageForm.tsx";
import { InitialStateType } from "../../redux/dialog-reducer";

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let addNewMessage = (values: newMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    let dialogElements = state.dialogs.map(d => <DialogMember name={d.name} id={d.id} />);

    let messagesElement = state.messages.map(m => <DialogItem message={m.message} />);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsMembers}>
                {dialogElements}
            </div>
            <div className={styles.messages}>
                {messagesElement}
                <div>
                    <AddMessageReduxForm onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

export type newMessageFormValuesType = {
    newMessageBody: string
}

type PropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void
}

export default Dialogs;