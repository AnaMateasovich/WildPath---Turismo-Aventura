import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Input } from "../../admin/components/Input/Input";
import { useSelector } from "react-redux";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "../../components/Button/Button";

const UserProfile = () => {
  const [view, setView] = useState("personalInfo");

  const { user } = useSelector((state) => state.auth);
  const avatar = user
    ? user.name[0].toUpperCase() + user.lastname[0].toUpperCase()
    : "";
  return (
    <main className={styles.container}>
      <section className={styles.profileSection}>
        <nav className={styles.profileNav}>
          <ul>
            <li className={view === "personalInfo" ? styles.selectedIcon : ""}>
              <button
                className={styles.iconButton}
                onClick={() => setView("personalInfo")}
              >
                <BadgeRoundedIcon style={{ fontSize: "3rem" }} />
              </button>
            </li>
            <li className={view === "cart" ? styles.selectedIcon : ""}>
              <button
                className={styles.iconButton}
                onClick={() => setView("cart")}
              >
                <ShoppingCartRoundedIcon style={{ fontSize: "3rem" }} />
              </button>
            </li>
            <li className={view === "history" ? styles.selectedIcon : ""}>
              <button
                className={styles.iconButton}
                onClick={() => setView("history")}
              >
                <HistoryRoundedIcon style={{ fontSize: "3rem" }} />
              </button>
            </li>
            <li className={view === "favorites" ? styles.selectedIcon : ""}>
              <button
                className={styles.iconButton}
                onClick={() => setView("favorites")}
              >
                <FavoriteRoundedIcon style={{ fontSize: "3rem" }} />
              </button>
            </li>
            <li className={view === "settings" ? styles.selectedIcon : ""}>
              <button
                className={styles.iconButton}
                onClick={() => setView("settings")}
              >
                <SettingsSuggestRoundedIcon style={{ fontSize: "3rem" }} />
              </button>
            </li>
          </ul>
        </nav>
        <div className={styles.infoSection}>
          {view === "personalInfo" && (
            <div className={styles.infoUser}>
              <div className={styles.infoUserleft}>
                {!user?.profilePicture ? (
                  <>
                    <p className={styles.avatar}>
                      {avatar}
                      <span className={styles.editProfilePictureIcon}>
                        <EditRoundedIcon style={{ fontSize: "1.5rem" }} />
                      </span>
                    </p>
                  </>
                ) : (
                  <img src="/src/assets/avatar.avif" alt="Tu foto de perfil" />
                )}
                <h2 className={styles.userFullName}>
                  {user.name} {user.lastname}
                </h2>
              </div>
              <div className={styles.infoUserRight}>
                <h3>Información personal</h3>
                <Input
                  htmlFor=""
                  labelName="Nombre"
                  type="text"
                  value={user.name}
                  inputName="userName"
                  onChange=""
                  disabled
                  id="userName"
                />

                <Input
                  htmlFor=""
                  labelName="Apellido"
                  type="text"
                  value={user.lastname}
                  inputName="userLastname"
                  onChange=""
                  disabled
                  id="userLastname"
                />

                <Input
                  htmlFor=""
                  labelName="Email"
                  type="text"
                  value={user.email}
                  inputName="userEmail"
                  onChange=""
                  disabled
                  id="userEmail"
                />
                <div className={styles.btnUpdateInfo}>
                  <Button text="Editar" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
