import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./HeaderLayout.module.css";
import { Logo } from "../../components/Logo/Logo";

export const HeaderLayout = () => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo/>
          <nav>
            <ul className={styles.navLinks}>
              <li className={styles.link}>
                <Link to="/">Inicio</Link>
              </li>
              <li className={styles.link}>
                <Link to="/actividades">Actividades</Link>
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
      </div>
      <Outlet />
    </>
  );
};
