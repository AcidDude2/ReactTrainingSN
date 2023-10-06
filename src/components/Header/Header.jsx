import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import SNlogo from "../../assets/images/SNlogo.jpg";

const Header = (props) => {
    return <header className={styles.header}>
        <img src = {SNlogo}/>
        <div className={styles.loginBlock}>
            {props.isAuth ? 
            <div>
                {props.login} <button onClick={props.logout}>Log out</button>
            </div>
            :<NavLink to={"/login"}>Login</NavLink>}
        </div>
    </header>
}

export default Header;