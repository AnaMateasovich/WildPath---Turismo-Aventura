import React, { useState } from "react";
import { useImages } from "../../context/ImagesContext";
import styles from "./FormImg.module.css";

export const FormImg = ({ nameLabel, maxImages, maxFileSizeMB, type }) => {
  const { images, setImages, previews, setPreviews } = useImages();

  const MAX_IMAGES = maxImages;
  const MAX_FILE_SIZE = maxFileSizeMB * 1024 * 1024;

  const handlePreview = (e) => {
    const selected = Array.from(e.target.files);
    const valid = selected.filter((file) => file.size <= MAX_FILE_SIZE);

    if (images[type]?.length + valid.length > MAX_IMAGES) {
      alert(`Solo puedes subir hasta ${MAX_IMAGES} imágenes`);
      e.target.value = "";

      return;
    }

    if (valid.length !== selected.length) {
      alert(
        `Algunas imágenes no se añadieron porque superan los ${maxFileSizeMB}MB`
      );
      e.target.value = "";
    }

    const newPreviews = valid.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newPreviews).then((previewsArray) => {
      setImages((prevImages) => ({
        ...prevImages,
        [type]: [...(prevImages[type] || []), ...valid],
      }));
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [type]: [...(prevPreviews[type] || []), ...previewsArray],
      }));
    });

    e.target.value = "";
  };

  const handleRemove = (e, index) => {
    e.preventDefault();

    const updatedImages = [...(images[type] || [])];
    const updatedPreviews = [...(previews[type] || [])];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages((prevImages) => ({
      ...prevImages,
      [type]: updatedImages,
    }));
    setPreviews((prevPreviews) => ({
      ...prevPreviews,
      [type]: updatedPreviews,
    }));
  };

  return (
    <div className={styles.formInputs}>
      <div className={styles.containerInput}>
        <label htmlFor="">{nameLabel || "Imágen"}</label>
        <input
          type="file"
          id="loadImage"
          accept="image/*"
          multiple
          onChange={handlePreview}
        />
      </div>
      <div className={styles.imgsContainer}>
        {previews[type]?.map((image, index) => (
          <div className={styles.imageContainer} key={index}>
            <button onClick={(e) => handleRemove(e, index)}>x</button>
            <img
              src={image}
              alt={`Vista previa ${index + 1}`}
              className={styles.img}
            />
          </div>
        ))}
      </div>
      {(previews[type]?.length ?? 0) === 0 && (
        <p className={styles.noteHelp}>
          Puedes subir hasta {maxImages}{" "}
          {maxImages > 1
            ? `imágenes y no deben superar ${maxFileSizeMB}MB cada una`
            : `imágen y no debe superar ${maxFileSizeMB}MB`}
        </p>
      )}
    </div>
  );
};
