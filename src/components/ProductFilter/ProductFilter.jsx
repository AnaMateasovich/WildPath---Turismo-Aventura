import React from "react";
import styles from "./ProductFilter.module.css";
import { Button } from "../Button/Button";

export const ProductFilter = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.filterPer}>Filtrar por:</h3>
      <fieldset className={styles.section}>
        <legend>Tipo de aventura</legend>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="trekking" />
          Senderismo
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="rafting" />
          Rafting
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="paragliding" />
          Parapente
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="diving" />
          Buceo
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="skiing" />
          Esquí
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="cycling" />
          Ciclismo
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="safari" />
          Safari
        </label>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Lugar</legend>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="mountain" />
          Montaña
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="forest" />
          Bosque
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="beach" />
          Playa
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="rive" />
          Río o Lago
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="snow" />
          Nieve
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="desert" />
          Desierto
        </label>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Dificultad</legend>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="mountain" />
          Facil (principiante)
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="forest" />
          Intermedio
        </label>
        <label htmlFor="">
          <input className={styles.checkInput} type="checkbox" name="aventura" value="beach" />
          Avanzado
        </label>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Rango de precios</legend>
        <label htmlFor="">
          <input className={styles.checkInput}
            type="number"
            name="aventura"
            value=""
            placeholder="Ej: 50000"
          />
          Minimo
        </label>
        <label htmlFor="">
          <input className={styles.checkInput}
            type="number"
            name="aventura"
            value=""
            placeholder="Ej: 100000"
          />
          Máximo
        </label>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Época del año</legend>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Tamaño de grupo</legend>
      </fieldset>
      <fieldset className={styles.section}>
        <legend>Extras</legend>
      </fieldset>
      <div className={styles.btnContainer}>
        <Button text="Filtrar" className={styles.btnFilter} />
      </div>
    </div>
  );
};
