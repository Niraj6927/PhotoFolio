import React from "react";
import styles from "./navbar.module.css";

export default function () {

  
  return (
    <div className={styles.navbar}>
      <img
        className={styles.coverImage}
        src={require("../../files/images/logo_4.png")}
        alt="album"
      />
      <span>PhotoFolio</span>
    </div>
  );
}
