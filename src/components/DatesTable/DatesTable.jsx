import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./DatesTable.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Swiper } from "swiper/react";

import { SwiperSlide } from "swiper/react";
export const DatesTable = ({ availableDates, pricePerPerson }) => {
  const [booking, setBooking] = useState({});

  const width = useWindowSize();

  const increment = (id) => {
    setBooking((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  const dates = availableDates.map(avDate => {
    const date = new Date(avDate.date + "T00:00:00")

    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }

    const format = date.toLocaleDateString('es-ES', options)

    return {
      ...avDate,
      formatDate: capitalize(format)
    }
  })

  const decrement = (id) => {
    setBooking((prev) => {
      const quantity = prev[id] || 0;
      if (quantity <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: quantity - 1,
      };
    });
  };
  if (width > 600) {
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
          {dates.map((dateAv) => (
            <tr key={dateAv.id}>
              <td scope="row">{dateAv.date}</td>
              <td className={styles.alignCenter}>{dateAv.capacity}</td>
              <td className={`${styles.buttons} ${styles.alignCenter}`}>
                <button
                  className={styles.btn}
                  onClick={() => decrement(dateAv.id)}
                >
                  -
                </button>
                {booking[dateAv.id] || 0}
                <button
                  className={styles.btn}
                  onClick={() => increment(dateAv.id)}
                >
                  +
                </button>
              </td>
              <td className={styles.alignCenter}>${pricePerPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <section className={styles.mobileContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 4000 }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {dates.map((dateAv) => (
            <SwiperSlide>
              <div className={styles.slideCard}>
                <div className={styles.slideItem}>
            
                  <p><strong>{dateAv.formatDate}</strong></p>
                </div>
                <div className={styles.slideItem}>
                  <p>
                    <strong>Cupos disponibles: </strong>
                  </p>
                  <p>{dateAv.capacity}</p>
                </div>
                <div className={styles.slideItem}>
                  <p>
                    <strong>Reservar para</strong>
                  </p>
                  <div className={styles.buttonsMobile}>
                    <button
                      className={styles.btn}
                      onClick={() => decrement(dateAv.id)}
                    >
                      -
                    </button>
                    {booking[dateAv.id] || 0}
                    <button
                      className={styles.btn}
                      onClick={() => increment(dateAv.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                  <div className={styles.price}><p>${pricePerPerson}</p></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }
};
