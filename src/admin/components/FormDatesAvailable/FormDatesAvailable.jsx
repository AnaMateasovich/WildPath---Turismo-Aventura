import React, { useState } from "react";
import styles from "./FormDatesAvailable.module.css";
import { Button } from "../../../components/Button/Button";
import { Input } from "../Input/Input";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch, useSelector } from "react-redux";
import { addDateAvailable, removeDateAvailable } from "../../redux/features/FullFormCreate/formSlice";

export const FormDatesAvailable = () => {
  const datesAvailable = useSelector((state) => state.fullForm.datesAvailable);
  const dispatch = useDispatch();

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
    dispatch(addDateAvailable(date));
    setDate({ date: "", capacity: "" });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeDateAvailable(index));
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
            id="dateAvailableDate"
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
            id="dateAvailableCapacity"

          />
        </div>
        <div className={styles.btnContainer}>
          <Button text="Añadir" id="dateAvailableButton" className={styles.btnAdd} onClick={handleAdd} />
        </div>
      </div>
      {datesAvailable.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fechas</th>
                <th className={styles.capacityTable}>Cupos</th>
              </tr>
            </thead>
            <tbody>
              {datesAvailable.map((item, index) => (
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
