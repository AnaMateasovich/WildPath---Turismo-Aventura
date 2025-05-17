import React from "react";
import styles from "./Sidebar.module.css";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HikingRoundedIcon from "@mui/icons-material/HikingRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/src/assets/logo.png" alt="logo" onClick={() => navigate("/")}/>
      </div>
      <nav className={styles.iconsList}>
        <ul className={styles.sectionIconsList}>
          <div className={styles.iconContainer} >
            <DashboardRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
              onClick={() => navigate("/admin")}
            />
            <span>Dashboard</span>
          </div>
        </ul>
        <ul className={styles.sectionIconsList}>
          <div className={styles.iconContainer} >
            <HikingRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
              onClick={() => navigate("/admin/actividades")}
            />
            <span>Listar Actividades</span>
          </div>
          <div className={styles.iconContainer}>
            <AddCircleRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
              onClick={() => navigate("/admin/actividades/crear")}
            />
            <span>Crear Actividad</span>
          </div>
          <div className={styles.iconContainer}>
            <EditRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Editar Actividad</span>
          </div>
        </ul>
        <ul className={styles.sectionIconsList}>
          <div className={styles.iconContainer}>
            <EventRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Listar Reservas</span>
          </div>
          <div className={styles.iconContainer}>
            <EventAvailableRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Confirmar Reservas</span>
          </div>
          <div className={styles.iconContainer}>
            <EventBusyRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Cancelar Reservas</span>
          </div>
          <div className={styles.iconContainer}>
            <EventRepeatRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Historial de Reservas</span>
          </div>
        </ul>
        <ul className={styles.sectionIconsList}>
          <div className={styles.iconContainer}>
            <WorkRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Empresas</span>
          </div>
          <div className={styles.iconContainer}>
            <GroupsRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Usuarios</span>
          </div>
          <div className={styles.iconContainer}>
            <AssignmentIndRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Administradores</span>
          </div>
        </ul>
        <ul className={styles.sectionIconsList}>
          <div className={styles.iconContainer}>
            <LogoutRoundedIcon
              style={{ fontSize: "2.5rem" }}
              className={styles.icon}
            />
            <span>Cerrar Sesión</span>
          </div>
        </ul>
      </nav>
    </div>
  );
};
