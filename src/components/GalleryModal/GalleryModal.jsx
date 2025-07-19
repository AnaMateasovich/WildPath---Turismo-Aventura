import React from "react";
import styles from "./GalleryModal.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";

export const GalleryModal = ({ images, onClose }) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <div className={styles.swiperContainer}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index} className={styles.slide}>
  <img
    src={`${API_URL}${image.src}`}
    alt={`Imagen ${index + 1}`}
    className={styles.image}
  />
</SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
