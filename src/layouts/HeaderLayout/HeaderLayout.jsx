import React from "react";
import styles from "./HeaderLayout.module.css";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const HeaderLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <img src="/src/assets/logo.png" alt="Logo WildPath" />
          </div>
          <div className={styles.txtLogo}>
            <h3>WILDPATH</h3>
            <p>- La aventura te espera -</p>
          </div>
        </div>
        <nav>
          <ul className={styles.navLinks}>
            <li className={styles.link}>
              <Link>Inicio</Link>
            </li>
            <li className={styles.link}>
              <Link>Actividades</Link>
            </li>
            <li className={styles.link}>
              <Link>Reservas</Link>
            </li>
            <li className={styles.link}>
              <Link>Blog</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.buttons}>
          <button className={styles.btnRegister}>Crear cuenta</button>
          <button className={styles.btnLogin}>Iniciar sesión</button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
