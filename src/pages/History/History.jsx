import React, { useEffect } from "react";
import styles from "./History.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../admin/redux/features/booking/bookingThunk";
import { useNavigate } from "react-router-dom";


const History = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const bookings = useSelector((state) => state.bookings.bookings);

  const statusTranslations = {
  CONFIRMED: "CONFIRMADO",
  PENDING: "PENDIENTE",
  REJECTED: "RECHAZADO",
  ENDED: "FINALIZADO"
};


const handleNavigate = (booking) => {
  navigate(`/actividades/${booking.packageId}`)
}

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);


  return (
    <div className={styles.container}>
      <h2>Historial de Reservas</h2>

     {bookings.map((booking) => (
  <div key={booking.id} className={styles.card}>
    <div className={styles.cardPackageName}>
      <h3>{booking.packageName}</h3>
      <p><strong>Fecha:</strong> {booking.date}</p>
    </div>

    <div>
      <p><strong>Personas:</strong> {booking.quantityPeople}</p>
      <p><strong>Estado:</strong> <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>{statusTranslations[booking.status] || booking.status}</span></p>
    </div>

    <div>
      <p><strong>Reservado el:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
      {booking.status === "CONFIRMED" ? (
          <button className={styles.reviewButton} onClick={() => handleNavigate(booking)}>{booking.hasReview ? "Ver paquete" : "Dejar reseña"}</button>
      ) : (
          <button className={styles.reviewButton} onClick={() => handleNavigate(booking)}>Ver paquete</button>

      )}
    </div>
  </div>
))}
    </div>
  );
};

export default History;
