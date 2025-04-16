import React from "react";
import styles from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";


type PropsType = {
    id: number
    name: string
}

const DialogMember: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    
    return (
        <div>
            <NavLink to={path} className={navData => navData.isActive ? styles.active : styles.dialog}>{props.name}</NavLink>
        </div>
    )
};

export default DialogMember;