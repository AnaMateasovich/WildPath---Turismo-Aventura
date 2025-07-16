import React from "react";
import styles from "./Gallery.module.css";
import { fakeProductData } from "../../data/db";
import { useParams } from "react-router-dom";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";

export const Gallery = ({ images = [], title = "imagen" }) => {
  const maxVisibleImages = 5;
  const visibleImages = images.slice(0, maxVisibleImages);
  const hasMoreImages = images.length > maxVisibleImages;

  return (
    <div className={styles.container}>
      <section className={styles.grid}>
        {visibleImages.map((image, index) => {
          const imageClass = index === 0 ? styles.firstImage : "";
          if (index === maxVisibleImages - 1 && hasMoreImages) {
            return (
              <div key={index} className={styles.viewMore}>
                <img
                  src={`${API_URL}${image.src}`}
                  alt={`${title} ${index + 1}`}
                  className={imageClass}
                  loading="lazy"
                />
              </div>
            );
          }

          return (
            <img
              key={index}
              src={`${API_URL}${image.src}`}
              alt={`${title} ${index + 1}`}
              className={imageClass}
              loading="lazy"
            />
          );
        })}
      </section>
    </div>
  );
};
