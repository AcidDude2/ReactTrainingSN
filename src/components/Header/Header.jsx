import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import SNlogo from "../../assets/images/SNlogo2.jpg";

const Header = (props) => {
    return <header className={styles.header}>
        <NavLink to={"*"}>
        <img src = {SNlogo}/>
        </NavLink>
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