import React, { useState } from "react";
import styles from "./DatesTable.module.css";
import { fakeProductData } from "../../data/db";
import { useParams } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { Button } from "../Button/Button";

export const DatesTable = () => {
  const { id } = useParams();
  const product = fakeProductData.find(
    (product) => product.id === parseInt(id)
  );
  const availability = product.availability;

  const [count, setCount] = useState(0);

  const increment = (index) => {
    setCount(count + 1);
  };

  const decrement = (index) => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th scope="col" className={styles.titleAvDates}>
            Fechas disponibles{" "}
            <CalendarMonthRoundedIcon
              style={{ fontSize: "2rem" }}
              className={styles.iconAvDates}
            />
          </th>
          <th scope="col">Cupos disponibles</th>
          <th scope="col">Cantidad de personas</th>
          <th scope="col">Precio por persona</th>
        </tr>
      </thead>
      <tbody className={styles.dates}>
        <tr className={styles.spacerRow}>
          <td colSpan="4"></td>
        </tr>
        {availability.map((dateAv, index) => (
          <tr key={index}>
            <td scope="row">{dateAv.date}</td>
            <td className={styles.alignCenter}>{dateAv.capacity}</td>
            <td className={`${styles.buttons} ${styles.alignCenter}`}>
              <button className={styles.btn} onClick={() => decrement(index)}>
                -
              </button>
              {count}
              <button className={styles.btn} onClick={() => increment(index)}>
                +
              </button>
            </td>
            <td className={styles.alignCenter}>${dateAv.pricePerPerson}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
