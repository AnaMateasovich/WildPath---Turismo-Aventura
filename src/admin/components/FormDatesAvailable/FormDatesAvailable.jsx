import React, { useState } from "react";
import styles from "./FormDatesAvailable.module.css";
import { Button } from "../../../components/Button/Button";
import { Input } from "../Input/Input";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  addDateAvailable,
  removeDateAvailable,
} from "../../redux/features/FullFormCreate/formSlice";

export const FormDatesAvailable = () => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const datesAvailable = useSelector((state) => state.fullForm.datesAvailable);
  const dispatch = useDispatch();

  const [date, setDate] = useState({
    date: "",
    spots: "",
  });
  const [range, setRange] = useState({
    start: "",
    end: "",
    days: [],
    spots: "",
  });
  const [generatedDates, setGeneratedDates] = useState([]);

const formatDateISO = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`; // yyyy-MM-dd
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRange((prev) => ({ ...prev, days: [...prev.days, value] }));
    } else {
      setRange((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d !== value),
      }));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!date.date || !date.spots) return;
    dispatch(addDateAvailable(date));
    setDate({ date: "", spots: "" });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeDateAvailable(index));
  };

  const handleGenerateDates = (e) => {
    e.preventDefault();
    const { start, end, days, spots } = range;
    if (!start || !end || !days.length || !spots) return;

    const startDate = new Date(start);
    const endDate = new Date(end);
    let dates = [];
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      const dayName = daysOfWeek[currentDate.getDay()];
      if (days.includes(dayName)) {
        const formatted = formatDateISO(currentDate);

        const alreadyAdded = datesAvailable.some((d) => d.date === formatted);
        const alreadyGenerated = dates.some((d) => d.date === formatted);
        if (!alreadyAdded && !alreadyGenerated) {
          dates.push({ date: formatted, spots });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    setGeneratedDates(dates);
  };

  const handleAddGenerated = () => {
    generatedDates.forEach((item) => dispatch(addDateAvailable(item)));
    setGeneratedDates([]);
    setRange({
      start: "",
      end: "",
      days: [],
      spots: "",
    });
  };

  const handleRemoveGenerated = (e, index) => {
    e.preventDefault();
    const updated = [...generatedDates];
    updated.splice(index, 1);
    setGeneratedDates(updated);
  };

  const isDayChecked = (day) => range.days.includes(day);

  return (
    <div className={styles.container}>
      <div className={styles.formDatesContainer}>
        <h4>Agregar un día específico</h4>
        <div className={styles.specificDayForm}>
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
          <div className={styles.spots}>
            <Input
              labelName="Cupos"
              placeholder="25"
              type="number"
              htmlFor="Cupos"
              onChange={handleChange}
              inputName="spots"
              value={date.spots}
              id="dateAvailableCapacity"
            />
          </div>
          <div className={styles.btnContainer}>
            <Button
              text="Añadir"
              id="dateAvailableButton"
              className={styles.btnAdd}
              onClick={handleAdd}
            />
          </div>
        </div>
      </div>

      <div className={styles.multipleDates}>
        <h4>Agregar múltiples fechas</h4>
        <div className={styles.rangeDatesForm}>
          <Input
            labelName="Desde"
            type="date"
            inputName="start"
            value={range.start}
            onChange={handleRangeChange}
            id="startRangeDate"
          />
          <Input
            labelName="Hasta"
            type="date"
            inputName="end"
            value={range.end}
            onChange={handleRangeChange}
            id="endRangeDate"

          />
          <Input
            labelName="Cupos"
            type="number"
            placeholder="25"
            inputName="spots"
            value={range.spots}
            onChange={handleRangeChange}
            id="rangeSpots"
          />
        </div>
        <div className={styles.checkAndButton}>
          <div className={styles.dayCheckboxes}>
            <label>Días:</label>
            <div className={styles.checkboxList}>
              {daysOfWeek.map((day, index) => (
                <label key={day} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={isDayChecked(day)}
                    onChange={handleDayCheckboxChange}
                    id={`day-${index}`}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.generateBtncontainer}>
            <Button
              text="Generar fechas"
              onClick={handleGenerateDates}
              className={styles.generateDatesBtn}
              id="generateDatesButton"
            />
          </div>
        </div>
      </div>

      {generatedDates.length > 0 && (
        <div className={styles.generatedContainer}>
          <h5 className={styles.generatedTitle}>Fechas generadas</h5>
          <div className={styles.scrollableTableContainer}>
            <table className={styles.generatedTable}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cupos</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {generatedDates.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.spots}</td>
                    <td>
                      <button onClick={(e) => handleRemoveGenerated(e, index)}>
                        <DeleteRoundedIcon style={{ fontSize: "2rem" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            text="Agregar al listado"
            onClick={handleAddGenerated}
            className={styles.btnAddGenerated}
            id="addRangeDatesButton"
          />
        </div>
      )}

      {datesAvailable.length > 0 ? (
        <div
          className={`${styles.tableContainer} ${styles.scrollableTableContainer}`}
        >
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
                  <td className={styles.capacityTable}>{item.spots}</td>
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
