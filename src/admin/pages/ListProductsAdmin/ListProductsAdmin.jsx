import React from "react";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { Button } from "../../../components/Button/Button";
import styles from "./ListProductsAdmin.module.css";
import { TableListAdmin } from "../../components/TableListAdmin/TableListAdmin";

const ListProductsAdmin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchCreateContainer}>
        <Searchbar/>
        <Button text="Crear actividad +" className={styles.btnCreate} />
      </div>
      <div className={styles.tableList}>
        <h1 className={styles.titleList}>Lista de actividades</h1>
        <TableListAdmin/>
      </div>
    </div>
  );
};

export default ListProductsAdmin;
