import React from "react";
import { Link } from "react-router-dom";
import styles from './Pagination.module.css'

export const Pagination = ({ cPage, totalPages }) => {
  return (
    <div className={styles.container}>
      {cPage > 1 && <Link href="" className={styles.prev}>Anterior</Link>}
      <span className={styles.currentPage}>{cPage}</span>
      <span>de</span>
      <span>{totalPages}</span>
      <Link href="" className={styles.next}>Siguiente</Link>
    </div>
  );
};
