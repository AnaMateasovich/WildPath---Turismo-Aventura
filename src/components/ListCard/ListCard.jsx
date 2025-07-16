import React from "react";
import styles from "./ListCard.module.css";
import { Button } from "../Button/Button";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useFilter } from "../../context/FilterProvider";
import { useNavigate } from "react-router-dom";

export const ListCard = ({
  image,
  title,
  location,
  valoration,
  totalReviews,
  days,
  price,
  id,
  datesAvailable
}) => {
  const navigate = useNavigate();
  const width = useWindowSize();
  const { getImageUrl } = useFilter();

  const handleNavigate = (id) => {
    navigate(`/actividades/${id}`)
  };

 const availableDates = datesAvailable?.filter(
  (d) => new Date(d.date) >= new Date() && d.spots > 0
);

const nextDate = availableDates?.length
  ? new Date(availableDates.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date)
  : null;

const formattedDate = nextDate
  ? nextDate.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : null;

  return (
    <article className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={getImageUrl(image)} alt={title} className={styles.img} loading="lazy" />
      </div>
      <div className={styles.info}>
        <div className={styles.firstInfo}>
          <div className={styles.packageLocation}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.location}>
              <LocationOnRoundedIcon style={{ fontSize: "1.5rem" }} />
              <span>{location}</span>
            </p>
            <p className={styles.duration}>{days}</p>
          </div>
          {valoration !== 0 && (

            <div className={styles.valorationContainer}>
            <p className={styles.points}>
              {valoration}
              <StarRateRoundedIcon style={{ fontSize: "2rem" }} />
            </p>
            <p className={styles.totalReviews}>{totalReviews} reseñas</p>
            {/* <p className={styles.comments}>{commQuantity}</p> */}
          </div>
          )}
        </div>
        {datesAvailable.length !== 0 && (

          <div><p className={styles.nextDate}>Proxima fecha: {formattedDate}</p></div>
        )}
        <div className={styles.priceBtnContainer}>
          <div className={styles.priceContainer}>
            <p className={styles.fromText}>Desde</p>
            <p>
              <span className={styles.price}>{price}</span> /persona
            </p>
          </div>
          <div className={styles.btnContainer}>
            <Button
              text="Explorar"
              className={styles.btnExplore}
              onClick={() => handleNavigate(id)}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
