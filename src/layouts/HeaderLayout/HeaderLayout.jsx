import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import { LogoutSection } from "../../components/LogoutSection/LogoutSection";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "./HeaderLayout.module.css";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

export const HeaderLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const width = useWindowSize();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    
  }, [user]);



  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          {width <= 1024 && width > 768 && (
            <img
              src="/src/assets/logo.png"
              alt="Logo de wildpath"
              className={styles.imgLogo}
            />
          )}
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          {/** boton hamburguesa */}
          <button className={styles.mobileMenu}>
            <MenuRoundedIcon
              style={width > 390 ? { fontSize: "5rem" } : { fontSize: "4rem" }}
            />
          </button>

          {(width > 1024 || menuOpen) && (
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
                  <li className={styles.link}>
                    <Link>Blog</Link>
                  </li>
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
                    onClick={() => navigate(`/iniciar-sesion`)}
                  >
                    Iniciar sesión
                  </button>
                </div>
              ) : (
                <section className={styles.userSection}>
                <ShoppingCartRoundedIcon className={styles.cartIcon} style={{fontSize: "3rem"}}/>
                <LogoutSection />
                </section>
              )}
            </>
          )}
        </header>
      </div>
      <Outlet />
    </>
  );
};
