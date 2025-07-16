import React, { useEffect, useState } from "react";
import styles from "./LogoutSection.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../admin/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useWindowSize } from "../../hooks/useWindowSize";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
export const LogoutSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false)


  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const avatar = user
    ? user.name[0].toUpperCase() + user.lastname[0].toUpperCase()
    : "";

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const width = useWindowSize();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "ROLE_ADMIN" || decoded.roles?.includes("ADMIN")) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [user, token]);

  return (
    <section className={styles.logout}>
      <div className={styles.mbLogout} onClick={() => setToggleLogout(!toggleLogout)}>
      <p className={styles.avatar}>{avatar}</p>
      {width <= 768 && !toggleLogout &&(
        <KeyboardArrowDownRoundedIcon style={{fontSize:"2rem"}}/>
      )}
      {width <= 768 && toggleLogout &&(
        <KeyboardArrowUpRoundedIcon style={{fontSize:"2rem"}}/>
      )}
      </div>
      <div className={`${width > 768 && styles.userButtons} ${width <= 768 && toggleLogout ? styles.openLogout : styles.closeLogout}`}>
        {isAdmin && (
          <p>
            <Link to="/admin">Admin</Link>
          </p>
        )}
        <p>
          <Link to="/perfil">Mi perfil</Link>
        </p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </section>
  );
};
