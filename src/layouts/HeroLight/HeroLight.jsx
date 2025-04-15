import React from "react";
import { Outlet } from "react-router-dom";
import styles from './HeroLight.module.css'
import { SearchForm } from "../../components/SearchForm/SearchForm";

export const HeroLight = () => {
  return (
    <>
      <div className={styles.formContainer}>
        <SearchForm className={styles.form} />
      </div>
      <Outlet />
    </>
  );
};
