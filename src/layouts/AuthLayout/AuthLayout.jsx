import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css'

export const AuthLayout = ({children, title, formContainerClass}) => {

 const location = useLocation();
  const path = location.pathname;

  let logoClass = '';

  if (path === '/login') {
    logoClass = styles.logoLogin;
  } else if (path === '/registro') {
    logoClass = styles.logoRegister;
  } else {
    logoClass = styles.logoDefault;
  }

  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
      </div>
      <section className={`${formContainerClass} ${styles.formContainer}`}>
        <form action="" className={styles.form}>
          <img src="/src/assets/logo.webp" alt="Logo Wildpath" className={logoClass} loading="lazy"/>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </form>
      </section>
    </div>
  );
};