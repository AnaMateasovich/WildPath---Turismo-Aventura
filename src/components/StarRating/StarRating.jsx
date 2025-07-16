import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "./StarRating.module.css";

const StarRating = ({ rating = 0, onRatingChange }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered ? star <= hovered : star <= rating;

        return (
          <span
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onRatingChange(star)}
            className={styles.star}
          >
            {isFilled ? (
              <StarIcon className={styles.filled} style={{fontSize:"2rem"}}/>
            ) : (
              <StarBorderIcon className={styles.empty} style={{fontSize:"2rem"}}/>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
