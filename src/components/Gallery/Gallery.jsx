import { useState } from "react";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import { GalleryModal } from "../GalleryModal/GalleryModal";
import styles from "./Gallery.module.css";

export const Gallery = ({ images = [], title = "imagen" }) => {
  const maxVisibleImages = 5;
  const visibleImages = images.slice(0, maxVisibleImages);
  const hasMoreImages = images.length > maxVisibleImages;

   
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <GalleryModal
          images={images}
          onClose={() => setShowModal(false)}
        />
      )}

    <div className={styles.container}>
      <section className={styles.grid}>
        {visibleImages.map((image, index) => {
          const imageClass = index === 0 ? styles.firstImage : "";
          if (index === maxVisibleImages - 1 && hasMoreImages) {
            return (
              <div key={index} className={styles.viewMore}  onClick={() => setShowModal(true)}>
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
              onClick={() => setShowModal(true)}
              />
            );
          })}
      </section>
    </div>
          </>
  );
};
