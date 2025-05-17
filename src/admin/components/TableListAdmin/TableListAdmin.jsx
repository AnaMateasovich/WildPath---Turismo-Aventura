import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deletePackageById,
  fetchPackages,
} from "../../redux/features/packages/packageThunk.js";
import styles from "./TableListAdmin.module.css";

export const TableListAdmin = () => {
  const dispatch = useDispatch();
  const travelPackages = useSelector((state) => state.packages.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const handleDelete = (packageId) => {
    const confirmed = window.confirm(
      `Estas segura/o que quieres eliminar el paquete con id ${packageId}`
    );
    if (confirmed) {
      dispatch(deletePackageById(packageId))
        .unwrap()
        .then(() => {
          toast.success("Paquete eliminado correctamente");
        })
        .catch((error) => {
          toast.error("Hubo un error al eliminar el paquete");
          console.error(error);
        });
    }
  };

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
        {travelPackages.map((tpackage) => (
          <tr key={tpackage.id}>
            <td>{tpackage.id}</td>
            <td>{tpackage.name}</td>
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
                onClick={() => handleDelete(tpackage.id)}
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
