import styles from "./PrincipalInfoSection.module.css";

export const PrincipalInfoSection = ({

  description,
  difficulty,
  duration,
  minAge,
  reqRes,
}) => {
  return (
    <div className={styles.container}>
  
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
