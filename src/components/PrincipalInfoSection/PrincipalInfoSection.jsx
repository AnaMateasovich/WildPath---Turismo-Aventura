import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import React from "react";
import styles from "./PrincipalInfoSection.module.css";
import { Gallery } from "../Gallery/Gallery";

export const PrincipalInfoSection = ({
  title,
  location,
  description,
  level,
  duration,
  minAge,
  reqRes,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.activity}>
        <h1 className={styles.titleAdv}>{title}</h1>
        <p className={styles.location}>
          <LocationOnRoundedIcon style={{ fontSize: "2.5rem" }} />
          <span>{location}</span>
        </p>
      </div>
      <div>
        <Gallery />
      </div>
      <div className={styles.descContainer}>
        <h2 className={styles.titleDesc}>¿Que vas a hacer?</h2>
        <p>{description}</p>
        <div className={styles.infoDesc}>
            <p><span>Nivel: </span>{level}</p>
            <p><span>Duración: </span>{duration}</p>
            <p><span>Edad mínima: </span>{minAge}</p>
        </div>
        <div>
          <h3 className={styles.reqResTitle}>Restricciones y recomendaciones</h3>
          <p>{reqRes}</p>
        </div>
      </div>
    </div>
  );
};
