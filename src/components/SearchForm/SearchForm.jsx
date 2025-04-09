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
        <select type="text" className={styles.advType}>
          <option value="" disabled>
            Tipo de aventura
          </option>
          <option value="">Senderismo</option>
          <option value="">Sky</option>
        </select>
        <input type="date" className={styles.date} placeholder="" />
      </div>
      <Button type="submit" text="Buscar" className={styles.btnSearch} />
    </form>
  );
};
