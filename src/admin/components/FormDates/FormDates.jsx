import React, { useState } from "react";
import styles from "./FormDates.module.css";
import { Button } from "../../../components/Button/Button";
import { Input } from "../Input/Input";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";


export const FormDates = () => {
  const [datesList, setDatesList] = useState([]);
  const [date, setDate] = useState({
    date: "",
    capacity: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setDatesList((prev) => [...prev, date]);
    setDate({ date: "", capacity: "" });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const itemRemove = datesList.filter((item, i) => {
      return i !== index;
    });
    setDatesList(itemRemove);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDatesContainer}>
        <div className={styles.date}>
          <Input
            labelName="Fecha"
            placeholder="Selecciona una fecha"
            type="date"
            htmlFor="Fecha"
            onChange={handleChange}
            inputName="date"
            value={date.date}
          />
        </div>
        <div className={styles.capacity}>
          <Input
            labelName="Cupos"
            placeholder="25"
            type="number"
            htmlFor="Cupos"
            onChange={handleChange}
            inputName="capacity"
            value={date.capacity}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button text="Añadir" className={styles.btnAdd} onClick={handleAdd} />
        </div>
      </div>
      {datesList.length > 0 ? (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Fechas</th>
                <th className={styles.capacityTable}>Cupos</th>
              </tr>
            </thead>
            <tbody>
              {datesList.map((item, index) => (
                <tr key={index}>
                  <td className={styles.dateTable}>{item.date}</td>
                  <td className={styles.capacityTable}>{item.capacity}</td>
                  <td className={styles.btnContainer}>
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
