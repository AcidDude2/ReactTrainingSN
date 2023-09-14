import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return <header className={styles.header}>
        <img src='https://images.wombo.art/generated/091992dc-17ce-4fec-8875-d5db00f89dcf/final.jpg?Expires=1694327227&Signature=1rue3FyfO6708G7jsDIzpLqJpmDDCvKJMscz4wzFELIjuoMi7zZDZkxjmiDpDk1rdUwkcwEnBTKCtrGChBkRogaKYh~DYxPj0eIU-gsxMv4sPnWuJGVzIsK~GItFzqcw6I1etTQRIxWHIpVCt9frR5h99jBv5XK9ZowAEArqbBNyj~3HUL~FptERPn7aBCTwXERGsAOEmpzLMedUEgY9Fq3ipT~tInVzpimpKRck0O-vBMa6ls0Tn1idirtM0LpPNPhKLCZIpFZ4piBOKEHwz9wxegB~VJp7PpYefDL~cZ0ONVelSUrbtdpEX4EjPVL7fd~XQvLL1w9mW1nbaTbc6g__&Key-Pair-Id=K1ZXCNMC55M2IL' />;

        <div className={styles.loginBlock}>
            {props.isAuth ? props.login
            :<NavLink to={"/login"}>Login</NavLink>}
        </div>
    </header>
}

export default Header;