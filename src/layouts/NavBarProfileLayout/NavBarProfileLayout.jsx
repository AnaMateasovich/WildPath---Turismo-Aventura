import React from "react";
import styles from "./NavBarProfileLayout.module.css";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
export const NavBarProfileLayout = () => {

    const location = useLocation()
const navigate = useNavigate()

const currentPath = location.pathname
  return (
    <>
      <nav className={styles.profileNav}>
        <ul>
          <li className={currentPath === "/perfil" ? styles.selectedIcon : ""}>
            <button
              className={styles.iconButton}
              onClick={() => navigate("/perfil")}
            >
              <BadgeRoundedIcon style={{ fontSize: "3rem" }} />
            </button>
          </li>
          <li className={currentPath === "cart" ? styles.selectedIcon : ""}>
            <button
              className={styles.iconButton}
              // onClick={() => navigate("cart")}
            >
              <ShoppingCartRoundedIcon style={{ fontSize: "3rem" }} />
            </button>
          </li>
          <li className={currentPath === "historial" ? styles.selectedIcon : ""}>
            <button
              className={styles.iconButton}
              onClick={() => navigate("historial")}
            >
              <HistoryRoundedIcon style={{ fontSize: "3rem" }} />
            </button>
          </li>
          <li className={currentPath === "/perfil/favoritos" ? styles.selectedIcon : ""}>
            <button
              className={styles.iconButton}
              onClick={() => navigate("/perfil/favoritos")}
            >
              <FavoriteRoundedIcon style={{ fontSize: "3rem" }} />
            </button>
          </li>
          <li className={currentPath === "settings" ? styles.selectedIcon : ""}>
            <button 
              className={styles.iconButton}
              // onClick={() => navigate("settings")}
            >
              <SettingsSuggestRoundedIcon style={{ fontSize: "3rem" }} />
            </button>
          </li>
        </ul>
      </nav>
      <div>

      <Outlet />
      </div>
    </>
  );
};
