import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import React from "react";
import styles from "./PrincipalInfoSection.module.css";
import { Gallery } from "../Gallery/Gallery";

export const PrincipalInfoSection = ({
  name,
  location,
  description,
  difficulty,
  duration,
  minAge,
  reqRes,
  images
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.activity}>
        <h1 className={styles.titleAdv}>{name}</h1>
        <p className={styles.location}>
          <LocationOnRoundedIcon style={{ fontSize: "2.5rem" }} />
          <span>{location}</span>
        </p>
      </div>
        <Gallery images={images} title={name}/>
      <div className={styles.descContainer}>
        <h2 className={styles.titleDesc}>¿Que vas a hacer?</h2>
        <p>{description}</p>
        <div className={styles.infoDesc}>
          <p>
            <span>Nivel: </span>
            {difficulty}
          </p>
          <p>
            <span>Duración: </span>
            {duration}
          </p>
          <p>
            <span>Edad mínima: </span>
            {minAge}
          </p>
        </div>
        <div>
          <h3 className={styles.reqResTitle}>
            Restricciones y recomendaciones
          </h3>
          <p>{reqRes}</p>
        </div>
      </div>
    </div>
  );
};
