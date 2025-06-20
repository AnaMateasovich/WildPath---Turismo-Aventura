import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import styles from "./Layouts.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { LogoutSection } from "../../components/LogoutSection/LogoutSection";

export const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const width = useWindowSize();

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  if (isMobile) {
    return (
      <div className={styles.alertMobile}>
        <p><WarningAmberRoundedIcon style={{ fontSize: "4rem" }} className={styles.iconAlert}/> No se puede usar la administración desde dispositivos móviles.</p>
      </div>
    );
  }
  return (
    <>
      <div className={styles.layoutContainer}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <div className={styles.sesion}>
              <LogoutSection />
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
