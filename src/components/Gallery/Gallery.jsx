import React from "react";
import styles from "./Gallery.module.css";
import { fakeProductData } from "../../data/db";
import { useParams } from "react-router-dom";

export const Gallery = () => {
  const { id } = useParams();

  const product = fakeProductData.find(
    (product) => product.id === parseInt(id)
  );

  if (product.images.length === 0) {
    return "No hay imágenes para mostrar";
  }

  const firstImage = product.images[0];
  const secondImage = product.images[1];
  const thirdImage = product.images[2];
  const smallImages = product.images.slice(3, 6);
  const restImages = product.images[8];

  return (
    <div className={styles.container}>
      <div className={styles.containerSup}>
        <img
          src={firstImage.src}
          alt={product.title}
          className={styles.firstImage}
        />

        <img
          src={secondImage.src}
          alt={product.title}
          className={styles.secondImage}
        />
        <img
          src={thirdImage.src}
          alt={product.title}
          className={styles.thirdImage}
        />
      </div>
      <div className={styles.restImages}>
        {smallImages.map((image) => (
          <img key={image.id} src={image.src} alt={product.title} />
        ))}
        <div className={styles.viewMore}>
          <img src={restImages.src} alt={product.title} />
        </div>
      </div>
    </div>
  );
};
