import React from "react";
import { Button } from "../Button/Button";
import styles from "./ReservationSummary.module.css";

export const ReservationSummary = ({
  selectedDay,
  peopleCount,
  pricePerPerson,
  meetingPoint,
  departureTime,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <p>
          <span>Fecha de salida: </span>
          {selectedDay}
        </p>
        <p>
          <span>Cantidad de personas: </span>
          {peopleCount}
        </p>
        <p>
          <span>Precio por persona: </span>
          {pricePerPerson}
        </p>
        <p>
          <span>Punto de encuentro: </span>
          {meetingPoint}
        </p>
        <p>
          <span>Hora de salida: </span>
          {departureTime}
        </p>
      </div>
      <div className={styles.totalPay}>
        <p className={styles.total}>Total a pagar:</p>
        <p> $345644</p>
      </div>
      <div className={styles.btnContainer}>
        <Button text="Reservar Lugar" className={styles.btn} />
      </div>
    </div>
  );
};
