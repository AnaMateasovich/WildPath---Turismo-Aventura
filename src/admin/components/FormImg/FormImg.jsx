import React, { useState } from "react";
import styles from "./FormImg.module.css";
import { Input } from "../Input/Input";

export const FormImg = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handlePreview = (e) => {
    const files = Array.from(e.target.files); // convierte FileList en array

    if (files.length + imagePreviews.length > MAX_IMAGES) {
      alert(`Solo puedes subir hasta ${MAX_IMAGES} imágenes`);
      return;
    }

    const newImagePreviews = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`La imágeb "${file.name}" pesa más de 2MB`);
        return;
      }
    });

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);

        if (newImagePreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={styles.formInputs}>
      <div className={styles.containerInput}>
        <label htmlFor="">Imágenes del paquete</label>
        <input
          type="file"
          id="Imagenes"
          accept="image/*"
          multiple
          onChange={handlePreview}
        />
      </div>
      <div className={styles.imgsContainer}>
        {imagePreviews.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vista previa ${index + 1}`}
            className={styles.img}
          />
        ))}
      </div>
      {imagePreviews.length === 0 && (
        <p className={styles.noteHelp}>
          Puedes subir hasta 10 imágenes y no deben pesar más de 2MB cada una
        </p>
      )}
    </div>
  );
};
