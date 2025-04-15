import React from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";

export const SearchForm = ({ className }) => {
  return (
    <form className={`${className} ${styles.searchForm}`}>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.location}
          placeholder="Ingrese una ubicación"
        />
        <select value="category" className={styles.category}>
          <option value="" defaultValue="" selected>
            Tipo de aventura
          </option>
          <option value="trekking">Senderismo</option>
          <option value="skiing">Sky</option>
        </select>
        <input type="date" className={styles.date} placeholder="" />
      </div>
      <Button type="submit" text="Buscar" className={styles.btnSearch} />
    </form>
  );
};
