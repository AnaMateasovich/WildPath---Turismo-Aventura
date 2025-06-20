import React from "react";
import styles from "./Logo.module.css"
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Logo = () => {
  const navigate = useNavigate()
  const width = useWindowSize()

  if (width <= 1024 && width > 768) {
    return (
      <div className={styles.logo} onClick={() => navigate("/")}>
        <h3>WILDPATH</h3>
        <p>- La aventura te espera -</p>
    </div>
    )
  }

  return (
    <div className={styles.logo} onClick={() => navigate("/")}>
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
