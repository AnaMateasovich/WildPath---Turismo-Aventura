import React from "react";
import styles from "./TableListAdmin.module.css";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { listProducts } from "../../../data/db.js";

export const TableListAdmin = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
        {listProducts.map((product) => (
          <tr>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td className={styles.icons}>
              <RemoveRedEyeRoundedIcon
                style={{ fontSize: "2rem" }}
                className={styles.icon}
                aria-label="ver"
              />
              <EditRoundedIcon
                style={{ fontSize: "2rem" }}
                className={styles.icon}
                aria-label="editar"
              />
              <DeleteRoundedIcon
                style={{ fontSize: "2rem" }}
                className={styles.icon}
                aria-label="eliminar"
              />
              <PauseRoundedIcon
                aria-label="pausar"
                style={{ fontSize: "2rem" }}
                className={styles.icon}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
