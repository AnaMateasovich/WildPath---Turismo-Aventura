import React from "react";
import styles from "./Logo.module.css"

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div>
        <img src="/src/assets/logo.png" alt="Logo WildPath" />
      </div>
      <div className={styles.txtLogo}>
        <h3>WILDPATH</h3>
        <p>- La aventura te espera -</p>
      </div>
    </div>
  );
};
