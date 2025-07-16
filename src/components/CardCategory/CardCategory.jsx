import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByCategory } from "../../admin/redux/features/packages/packageThunk";
import styles from "./CardCategory.module.css";

export const CardCategory = ({ id, name, description, img, alt, className }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const listPackagesByCategory = (id) => {
    dispatch(filterByCategory(id))
    // navigate("/actividades")
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={() => listPackagesByCategory(id)}
    >
      <img
        src={`http://localhost:8081${img}`}
        alt={alt}
        className={styles.img}
        loading="lazy"
      />
      <h3 className={styles.title}>{name}</h3>
      <p>{description}</p>
    </div>
  );
};
