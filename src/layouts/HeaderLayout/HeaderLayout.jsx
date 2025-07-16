import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import { LogoutSection } from "../../components/LogoutSection/LogoutSection";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "./HeaderLayout.module.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { AuthLayout } from "../AuthLayout/AuthLayout";

export const HeaderLayout = () => {


  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const width = useWindowSize();
  const navigate = useNavigate();


  return (
    <>
      <div className={styles.container}>
        <header className={`${width > 1024 ? styles.headerFixed : styles.header}`}>
          <div className={styles.logoContainer}>
            <Logo />
          {width <= 1024 && (
             !user ? (
              <div className={styles.mbButtons}>
                <button
                  className={styles.btnRegister}
                  onClick={() => navigate(`/registro`)}
                  >
                  Crear cuenta
                  </button>
                  <button
                  className={styles.btnLogin}
                  onClick={() => navigate(`/login`)}
                  >
                  Iniciar sesión
                  </button>
                  </div>
                ) : (
                  <LogoutSection />
                )
              )}
            
          </div>

          {width > 1024 ? (
            <>
              {/* NAV ESCRITORIO */}
              <nav className={styles.navDesktop}>
                <ul className={styles.navLinks}>
                  <li className={styles.link}>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to="/actividades">Actividades</Link>
                  </li>
                  <li className={styles.link}>
                    <Link to="/categorias">Categorías</Link>
                  </li>
                  {/* <li className={styles.link}>
                    <Link>Blog</Link>
                  </li> */}
                </ul>
              </nav>
              {!user ? (
                <div className={styles.buttons}>
                  <button
                    className={styles.btnRegister}
                    onClick={() => navigate(`/registro`)}
                  >
                    Crear cuenta
                  </button>
                  <button
                    className={styles.btnLogin}
                    onClick={() => navigate(`/login`)}
                  >
                    Iniciar sesión
                  </button>
                </div>
              ) : (
                <section className={styles.userSection}>
                  {/* <Link to="/reservar">
                    <ShoppingCartRoundedIcon
                      className={styles.cartIcon}
                      style={{ fontSize: "3rem" }}
                    />
                  </Link> */}
                  <Link to="/perfil/favoritos" aria-label="Ver favoritos">
                    <FavoriteRoundedIcon
                      className={styles.cartIcon}
                      style={{ fontSize: "3rem" }}
                    />
                  </Link>
                  <LogoutSection />
                </section>
              )}
            </>
          ) : (
            <nav className={styles.navMobile}>
              <ul className={styles.navLinks}>
                <li className={styles.link}>
                  <Link to="/">
                    <HomeRoundedIcon style={{ fontSize: "2.5rem" }} />
                    Inicio
                  </Link>
                </li>
                <li className={styles.link}>
                  <Link to="/actividades">
                    <HikingRoundedIcon style={{ fontSize: "2.5rem" }} />
                    Actividades</Link>
                </li>
                <li className={styles.link}>
                  <Link to="/categorias">
                    <CategoryRoundedIcon style={{ fontSize: "2.5rem" }} />
                    Categorías</Link>
                </li>
                <li>

                  <Link className={styles.mobileMenu} to="/">
                    <MenuRoundedIcon
                      style={{ fontSize: "3.2rem" }}
                    />
                    Menú
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>
      </div>
      <Outlet />
    </>
  );
};
