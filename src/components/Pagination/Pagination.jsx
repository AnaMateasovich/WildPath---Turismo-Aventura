import React from "react";
import { Link } from "react-router-dom";
import styles from './Pagination.module.css'
import { Button } from "../Button/Button";

export const Pagination = ({ cPage, totalPages, onPrev, onNext }) => {
  return (
    <div className={styles.container}>
      <Button onClick={onPrev} disabled={cPage <= 1} text="Anterior" className={styles.prev}/>
      <span className={styles.currentPage}>{cPage}</span>
      <span>de</span>
      <span>{totalPages}</span>
      <Button onClick={onNext} disabled={cPage >= totalPages} text="Siguiente" className={styles.next}/>
    </div>
  );
};
