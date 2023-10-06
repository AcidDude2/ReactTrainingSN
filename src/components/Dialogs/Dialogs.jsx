import React from "react";
import styles from "./Dialogs.module.css";
import DialogMember from "./DialogMember/DialogMember";
import Message from "./Message/Message";
import { AddMessageReduxForm } from "./AddMessageForm/AddMessageForm";


const Dialogs = (props) => {
    let state = props.dialogsPage;
    // console.log(props.users);

    let sendMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    let dialogElements = state.dialogs.map(d => <DialogMember name={d.name} id={d.id} />);

    let messagesElement = state.messages.map(m => <Message message={m.message} />);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsMembers}>
                {dialogElements}
            </div>
            <div className={styles.messages}>
                {messagesElement}
                <div>
                    <AddMessageReduxForm onSubmit={sendMessage} />
                </div>
            </div>
        </div>
    )
}


export default Dialogs;