import React from "react";
import styles from "./Gallery.module.css";
import { fakeProductData } from "../../data/db";
import { useParams } from "react-router-dom";

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
                  src={image.src}
                  alt={`${title} ${index + 1}`}
                  className={imageClass}
                />
              </div>
            );
          }

          return (
            <img
              key={index}
              src={image.src}
              alt={`${title} ${index + 1}`}
              className={imageClass}
            />
          );
        })}
      </section>
    </div>
  );
};
