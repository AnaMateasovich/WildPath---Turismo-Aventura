import React from "react";
import styles from "./Logo.module.css"
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Logo = () => {
  const navigate = useNavigate()
  const width = useWindowSize()

  return (
    <div className={styles.logo} onClick={() => navigate("/")}>
      <div className={styles.imgLogo}>
        <img src="/src/assets/logo.png" alt="Logo WildPath" loading="lazy"/>
      </div>
      <div className={styles.txtLogo}>
        <h3>WILDPATH</h3>
        <p>- La aventura te espera -</p>
      </div>
    </div>
  );
};
