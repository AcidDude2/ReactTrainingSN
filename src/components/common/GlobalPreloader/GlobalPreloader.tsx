import React from "react";
import preloader from "../../../assets/images/preloader.gif";
import styles from "./GlobalPreloaer.module.css"

const GlobalPreloader: React.FC = () => {
    return <div className={styles.preloader}>
         <img src={preloader} />
    </div>

}

export default GlobalPreloader;