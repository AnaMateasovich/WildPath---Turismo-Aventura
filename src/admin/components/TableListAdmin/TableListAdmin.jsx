import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { toast } from "react-toastify";
import styles from "./TableListAdmin.module.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const TableListAdmin = ({
  firstColumn,
  secondColumn,
  arr,
  field1,
  field2,
  onDelete,
  isLoading,
  actions,
  onRefresh,
  messageDelete,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    const { id } = item;
    const confirmed = window.confirm(
      messageDelete
        ? `${messageDelete} "${item[field1]}"?\nEsto eliminará todos los elementos relacionados.`
        : `¿Estás segura/o que querés eliminar el ítem con id ${id}?`
    );

    if (confirmed) {
      dispatch(onDelete(id))
        .then(() => {
          dispatch(onRefresh())
            .unwrap()
            .then(() => {
              toast.success("Item eliminado correctamente");
            });
        })
        .catch((error) => {
          toast.error("Hubo un error al eliminar el item");
          console.error(error);
        });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{firstColumn}</th>
          <th>{secondColumn}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="3">Cargando...</td>
          </tr>
        ) : arr.length === 0 ? (
          <tr>
            <td colSpan="3">No hay datos para mostrar.</td>
          </tr>
        ) : (
          arr.map((item) => (
            <tr key={item.id}>
              <td>{item[field1]}</td>
              <td>{item[field2]}</td>
              <td>
                <div className={styles.icons}>
                  {actions?.map(({ icon, onClick, label }, i) => (
                    <span
                      key={i}
                      className={styles.icon}
                      aria-label={label}
                      onClick={() => onClick(item)}
                    >
                      {React.cloneElement(icon, {
                        style: { fontSize: "2rem" },
                      })}
                    </span>
                  ))}
                  <span>
                    <DeleteRoundedIcon
                      style={{ fontSize: "2rem" }}
                      className={styles.icon}
                      aria-label="eliminar"
                      onClick={() => handleDelete(item)}
                    />
                  </span>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
