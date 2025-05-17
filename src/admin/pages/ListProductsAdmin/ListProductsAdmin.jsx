import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { TableListAdmin } from "../../components/TableListAdmin/TableListAdmin";
import styles from "./ListProductsAdmin.module.css";

const ListProductsAdmin = () => {

const navigate = useNavigate()

  const goToCreatePackage = () => {
    navigate('/admin/actividades/crear')
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchCreateContainer}>
        <Searchbar/>
        <Button text="Crear paquete +" className={styles.btnCreate} onClick={goToCreatePackage}/>
      </div>
      <div className={styles.tableList}>
        <h1 className={styles.titleList}>Lista de actividades</h1>
        <TableListAdmin/>
      </div>
    </div>
  );
};

export default ListProductsAdmin;
