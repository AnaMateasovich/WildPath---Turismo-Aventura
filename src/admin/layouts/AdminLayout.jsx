import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import styles from "./Layouts.module.css";

export const AdminLayout = () => {
  return (
    <>
      <div className={styles.layoutContainer}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <div className={styles.sesion}>
              <div>
                <h3>Admin 1</h3>
                <p className={styles.closeSesion}>Cerrar sesión</p>
              </div>
              <img
                src="/src/assets/avatar.avif"
                alt="Avatar admin"
                className={styles.avatarSesion}
              />
            </div>
          </header>
          <main className={styles.main}>
            <h1 className={styles.dashboardTitle}>
              Dashboard de administración
            </h1>
            <hr className={styles.line} />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
