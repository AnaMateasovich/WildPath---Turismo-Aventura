import React from "react";
import { Button } from "../Button/Button";
import styles from "./ReservationSummary.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ReservationSummary = ({
  selectedDay,
  peopleCount,
  pricePerPerson,
  meetingPoint,
  departureTime,
  onClickReserve,
  classNameContainer
}) => {

  return (
    <div className={`${styles.container} ${classNameContainer}`}>
      <div className={styles.bookingInfo}>
        <p>
          <span>Fecha de salida: </span>
          {selectedDay?.date }
        </p>
        <p>
          <span>Cantidad de personas: </span>
          {selectedDay?.date && peopleCount}
        </p>
        <p>
          <span>Precio por persona: </span>
          ${pricePerPerson}
        </p>
        {/* <p>
          <span>Punto de encuentro: </span>
          {meetingPoint}
        </p>
        <p>
          <span>Hora de salida: </span>
          {departureTime}
        </p> */}
      </div>
      <div className={styles.totalPay}>
        <p className={styles.total}>Total a pagar:</p>
        <p>${pricePerPerson * peopleCount}</p>
      </div>
      <div className={styles.btnContainer}>
        <Button text="Reservar Lugar" className={styles.btn} onClick={onClickReserve} />
      </div>
    </div>
  );
};
