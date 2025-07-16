import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HikingRoundedIcon from "@mui/icons-material/HikingRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import CategoryIcon from "@mui/icons-material/Category";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className={`${styles.container}  ${isOpen ? styles.open : ""}`}>
      <button
        className={`${styles.btnOpenMenu}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? (
          <ArrowForwardIosRoundedIcon style={{ fontSize: "4rem" }} />
        ) : (
          <ArrowBackIosRoundedIcon style={{ fontSize: "4rem" }} />
        )}
      </button>
      <div className={styles.logo}>
        <img
          src="/src/assets/logo.png"
          alt="logo"
          onClick={() => navigate("/")}
          loading="lazy"
        />
      </div>
      <nav className={`${isOpen && styles.listMenuOpen} ${styles.iconsList}`}>
        <ul className={styles.sectionIconsList}>
          <li>
            <Link
              to="/admin"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <DashboardRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul className={`${styles.sectionIconsList} `}>
          <li>
            <Link
              to="/admin/actividades"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <HikingRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Listar Actividades</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/actividades/crear"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <AddCircleRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Crear Actividad</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.sectionIconsList}>
          <li>
            <Link
              to="/admin/categories"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <CategoryIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Categorías</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.sectionIconsList}>
          <li>
            <Link
              to="/admin"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <WorkRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Empresas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <GroupsRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Usuarios</span>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/admin"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <AssignmentIndRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Administradores</span>
            </Link>
          </li> */}
        </ul>
        {/* <ul className={styles.sectionIconsList}>
          <li>
            <Link
              to="/admin"
              className={`${styles.iconContainer} ${
                isOpen && styles.whenOpenTextItem
              }`}
            >
              <LogoutRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className={styles.icon}
              />
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};
