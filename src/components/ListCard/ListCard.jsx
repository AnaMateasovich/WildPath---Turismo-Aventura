import React from "react";
import styles from "./ListCard.module.css";
import { Button } from "../Button/Button";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export const ListCard = ({
  image,
  title,
  location,
  valoration,
  points,
  commQuantity,
  days,
  price,
}) => {
  return (
    <article className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={image} alt={title} className={styles.img} />
      </div>
      <div className={styles.info}>
        <div className={styles.firstInfo}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.location}><LocationOnRoundedIcon style={{ fontSize: "1.5rem" }} />{location}</p>
            <p>{days}</p>
          </div>
          <div className={styles.valorationContainer}>
            <p className={styles.valoration}>{valoration}</p>
            <p className={styles.points}>
              {points}
              <StarRateRoundedIcon style={{ fontSize: "2rem" }} />
            </p>
            <p className={styles.comments}>{commQuantity}</p>
          </div>
        </div>
        <div className={styles.priceBtnContainer}>
          <div>
            <p>Desde</p>
            <p>
              <span className={styles.price}>{price}</span> /persona
            </p>
          </div>
          <div>
            <Button text="Explorar" className={styles.btnExplore} />
          </div>
        </div>
      </div>
    </article>
  );
};
