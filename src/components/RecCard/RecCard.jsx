import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Button } from "../Button/Button";
import styles from "./RecCard.module.css";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export const RecCard = ({
  img,
  alt,
  ubi,
  valoration,
  title,
  duration,
  price,
  className,
  onClickBtn,
  totalReviews,
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <img src={`${API_URL}${img}`} alt={alt} className={styles.img} loading="lazy" />
      <div className={styles.contentCard}>
        <div>
          <p className={styles.location}>
            <LocationOnRoundedIcon />
            {ubi}
          </p>
          {valoration !== 0 && (

            <div className={styles.valoration}>
              <p className={styles.totalReviews}>
                {totalReviews} reseñas
              </p>
              <p className={styles.stars}>
                {valoration}
                <StarRateRoundedIcon style={{ fontSize: "2rem" }} />
              </p>
            </div>
          )}
        </div>
        <div className={styles.titleContainer}>
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
        <Button
          text="Ver fechas"
          className={styles.btnCard}
          onClick={onClickBtn}
        ></Button>
      </div>
    </div>
  );
};
