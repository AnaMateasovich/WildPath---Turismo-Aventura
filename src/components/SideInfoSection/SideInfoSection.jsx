import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import styles from "./SideInfoSection.module.css";
export const SideInfoSection = ({
  stars,
  includes = [],
  meetingPoints,
  nameComment,
  textComment,
  className,
  comments,
  totalReviews,
}) => {
  return (
    <section className={`${className} ${styles.container}`}>
      {stars !== 0 && (
        <div className={styles.valContainer}>
          <h4 className={styles.val}>
            {stars}
            <StarRateRoundedIcon style={{ fontSize: "2rem" }} />
          </h4>
        </div>
      )}
      <div className={styles.charact}>
        <h4 className={styles.title}>Características</h4>
        <ul className={styles.list}>
          {includes.map((item, index) => (
            <li key={index} className={styles.item}>
              <img
                src={item.icon}
                alt={item.text}
                className={styles.includesIcon}
                loading="lazy"
              />
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
      {totalReviews !== 0 && (
        <div>
          <h4 className={styles.title}>Comentarios</h4>
          <div className={styles.list}>

            <p className={styles.totalReviews}>{totalReviews} reseñas</p>
            {comments?.map((comment, index) => (
              <div key={index}>
                <div className={styles.nameAndDate}>
                  <div className={styles.nameAndStars}>
                    <p className={styles.nameComment}>{comment.userName}</p>
                    <p>
                      {[...Array(comment.stars)].map((_, i) => (
                        <StarRateRoundedIcon
                          key={i}
                          style={{ fontSize: "2rem" }}
                          className={styles.stars}
                        />
                      ))}
                    </p>
                  </div>

                  <p className={styles.date}>
                    {new Date(comment.createdAt).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className={styles.textComment}>{comment.comment}</p>
              </div>
            ))}
          </div>
          {/* <div className={styles.btnViewMore}>
          <button>Ver todos</button>
          </div> */}
        </div>
      )}
    </section>
  );
};
