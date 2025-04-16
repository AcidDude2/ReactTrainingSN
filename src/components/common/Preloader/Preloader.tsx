import React from "react";
import preloader from "../../../assets/images/preloader.gif";
import styles from "./Preloader.module.css"


const Preloader: React.FC = () => {
    return <div className={styles.preloader}>
         <img src={preloader} />
    </div>

};

export default Preloader;