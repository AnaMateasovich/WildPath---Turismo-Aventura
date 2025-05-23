import React, { useState } from "react";
import styles from "./FormSchedule.module.css";
import { Input } from "../Input/Input";
import { Button } from "../../../components/Button/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch, useSelector } from "react-redux";
import { addScheduleItem, removeScheduleItem } from "../../redux/features/FullFormCreate/formSlice";

export const FormSchedule = () => {

  const scheduleList = useSelector((state) => state.fullForm.schedule)
  const dispatch = useDispatch()
  const [schedule, setSchedule] = useState({
    day: "",
    hour: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addScheduleItem(schedule))
    setSchedule({ day: "", hour: "", description: "" });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeScheduleItem(index))
  };

  return (
    <div>
      <label htmlFor="Dia" className={styles.labelTitle}>
        Itinerario
      </label>
      <div className={styles.formScheduleContainer}>
        <div className={styles.day}>
          <Input
            labelName="Día"
            placeholder="Día 1 - Llegada a El Calafate"
            type="text"
            htmlFor="Dia"
            onChange={handleChange}
            inputName="day"
            value={schedule.day}
          />
        </div>
        <div className={styles.hour}>
          <Input
            labelName="Horario"
            placeholder="14:00hs - 16:00hs"
            type="text"
            htmlFor="Horario"
            onChange={handleChange}
            inputName="hour"
            value={schedule.hour}
          />
        </div>
        <div className={styles.description}>
          <Input
            labelName="Descripción"
            placeholder="Visita guiada por la ciudad y miradores"
            type="text"
            htmlFor="Descripcion"
            onChange={handleChange}
            inputName="description"
            value={schedule.description}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button text="Añadir" className={styles.btnAdd} onClick={handleAdd} />
        </div>
      </div>
      {scheduleList.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Día</th>
                <th>Hoarario</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((item, index) => (
                <tr key={index}>
                  <td className={styles.dayTable}>{item.day}</td>
                  <td className={styles.hourTable}>{item.hour}</td>
                  <td className={styles.descriptionTable}>
                    {item.description}
                  </td>
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
