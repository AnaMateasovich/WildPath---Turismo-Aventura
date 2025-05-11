import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../Input/Input";
import styles from "./FormRequirements.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addRequirement, removeRequirement } from "../../redux/features/FullFormCreate/formSlice";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export const FormRequirements = () => {
  const requirements = useSelector((state) => state.fullForm.requirements);
  const dispatch = useDispatch();

  const [requirement, setRequirement] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequirement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addRequirement(requirement));
    setRequirement({
      title: "",
      description: "",
    });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeRequirement(index));
  }


  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <div className={styles.title}>
          <Input
            labelName="Título"
            placeholder="Edad mínima"
            type="text"
            htmlFor="Titulo"
            onChange={handleChange}
            inputName="title"
            value={requirement.title}
          />
        </div>
        <div className={styles.description}>
          <Input
            labelName="Descripción"
            placeholder="12 años"
            type="text"
            htmlFor="Descripcion"
            onChange={handleChange}
            inputName="description"
            value={requirement.description}
          />
        </div>
      </div>
      <div className={`${styles.btnContainer} ${styles.btnAddContainer}`}>
        <Button text="Añadir" className={styles.btnAdd} onClick={handleAdd} />
      </div>
      {requirements.length > 0 ? (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th className={styles.capacityTable}>Descripción</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((item, index) => (
                <tr key={index}>
                  <td className={styles.dateTable}>{item.title}</td>
                  <td className={styles.capacityTable}>{item.description}</td>
                  <td className={`${styles.btnContainer} ${styles.btnRemoveContainer}`}>
                    <button
                      className={styles.btnRemove}
                      onClick={(e) => handleRemove(e, index)}
                    >
                      <DeleteRoundedIcon style={{ fontSize: "2rem" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noteHelp}>Aquí se irá armando la lista</p>
      )}
    </div>
  );
};
