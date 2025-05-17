import React, { useState } from "react";
import { useImages } from "../../context/ImagesContext";
import styles from "./FormImg.module.css";

export const FormImg = () => {
 
  const {images, setImages, previews, setPreviews} = useImages()
  

  const MAX_IMAGES = 6;
  const MAX_FILE_SIZE = 3 * 1024 * 1024;


  const handlePreview = (e) => {
    const selected = Array.from(e.target.files);
    const valid = selected.filter((file) => file.size <= MAX_FILE_SIZE);

    if (images.length + valid.length > MAX_IMAGES) {
      alert(`Solo puedes subir hasta ${MAX_IMAGES} imágenes`);
      return;
    }

    if (valid.length !== selected.length) {
      alert("Algunas imágenes no se añadieron porque superan los 2MB");
    }

    const newPreviews = valid.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newPreviews).then((previews) => {
      setImages([...images, ...valid]); 
      setPreviews((prevPreviews) => [...prevPreviews, ...previews]); 
    });
  };

  const handleRemove = (e, index) => {
    e.preventDefault();

    
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setPreviews(updatedPreviews);
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
        {previews.map((image, index) => (
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
      {previews.length === 0 && (
        <p className={styles.noteHelp}>
          Puedes subir hasta 5 imágenes y no deben superar 2MB cada una
        </p>
      )}
    </div>
  );
};
