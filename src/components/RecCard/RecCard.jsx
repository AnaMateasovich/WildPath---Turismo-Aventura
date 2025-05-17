import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Button } from "../Button/Button";
import styles from "./RecCard.module.css";

export const RecCard = ({
  img,
  alt,
  ubi,
  val,
  title,
  duration,
  price,
  className,
  onClickBtn
}) => {


  return (
    <div className={`${styles.card} ${className}`}>
      <img src={img} alt={alt} className={styles.img} />
      <div className={styles.contentCard}>
        <div>
          <p className={styles.location}>
            <LocationOnRoundedIcon />
            {ubi}
          </p>
          <div className={styles.val}>{val}</div>
        </div>
        <div>
          <h5 className={styles.titleCard}>{title}</h5>
          <p className={styles.duration}>{duration}</p>
        </div>
        <div>
          <p>Desde</p>
          <div className={styles.price}>
            <p className={styles.priceNumber}>{price}</p>
            <p>/persona</p>
          </div>
        </div>
        <Button text="Ver fechas" className={styles.btnCard} onClick={onClickBtn}></Button>
      </div>
    </div>
  );
};
