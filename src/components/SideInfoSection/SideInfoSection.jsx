import React from "react";
import styles from "./SideInfoSection.module.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export const SideInfoSection = ({
  val,
  includes = [],
  meetingPoints,
  nameComment,
  textComment,
  className
}) => {
  return (
    <section className={`${className} ${styles.container}`}>
      <div className={styles.valContainer}>
        <h4 className={styles.val}>
          {val}
          <StarRateRoundedIcon style={{ fontSize: "2rem" }} />
        </h4>
      </div>
      <div className={styles.charact}>
        <h4 className={styles.title}>Características</h4>
        <ul className={styles.list}>
          {includes.map((item, index) => (
            <li key={index} className={styles.item}>
              <img src={item.icon} alt={item.text} className={styles.includesIcon}/>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className={styles.title}>Puntos de encuentro</h4>
        <div className={styles.list}>
          <p className={styles.meetingPoints}>{meetingPoints}</p>
        </div>
      </div>
      <div>
        <h4 className={styles.title}>Comentarios destacados</h4>
        <div className={styles.list}>
          <p className={styles.nameComment}>{nameComment}</p>
          <p className={styles.textComment}>{textComment}</p>
          <button className={styles.iconNextComm}>
            <ChevronRightRoundedIcon style={{ fontSize: "4rem" }} />
          </button>
        </div>
        <div className={styles.btnViewMore}>
          <button>Ver todos</button>
        </div>
      </div>
    </section>
  );
};
