import React, { useEffect, useState } from "react";
import styles from "./LogoutSection.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../admin/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export const LogoutSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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
      <p className={styles.avatar}>{avatar}</p>
      <div className={styles.userButtons}>
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
