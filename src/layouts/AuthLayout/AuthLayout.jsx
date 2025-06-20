import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css'

export const AuthLayout = ({children, title, formContainerClass}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
      </div>
      <section className={`${formContainerClass} ${styles.formContainer}`}>
        <form action="" className={styles.form}>
          <img src="/src/assets/logo.png" alt="Logo Wildpath" className={styles.logo}/>
          <h1>{title}</h1>
          {children}
        </form>
      </section>
    </div>
  );
};