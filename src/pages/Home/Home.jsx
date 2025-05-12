import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { RecCard } from "../../components/RecCard/RecCard";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { category, recommendations } from "../../data/db.js";
import styles from "./Home.module.css";

const Home = () => {


  return (
    <>
      <div className={styles.hero}>
        <div className={styles.form}>
          <h1 className={styles.titleHero}>
            Encuentra la aventura perfecta para tí
          </h1>
          <SearchForm className={styles.searchForm} />
        </div>
      </div>
      <div className={styles.categoriesContainer}>
        <h2 className={styles.categoriesTitle}>
          ¡Explora sin límites, vive la aventura!
        </h2>
        <Swiper
        className={styles.categories}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 4000 }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {category.map((category, index) => (
            <SwiperSlide key={index}>
              <CardCategory
                name={category.name}
                description={category.description}
                img={category.img}
                alt={category.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.viewMoreContainer}>
          <Link className={styles.viewMore}>Ver todas</Link>
        </div>
      </div>
      <div className={styles.recommendations}>
        <h3 className={styles.titleRecom}>Recomendaciones</h3>
        <div className={styles.recCards}>
          {recommendations.map((item, index) => (
            <RecCard
              key={index}
              img={item.img}
              price={item.price}
              alt={item.title}
              ubi={item.ubi}
              val={item.val}
              title={item.title}
              duration={item.duration}
            />
          ))}
        </div>
        <div className={styles.viewMoreContainer}>
          <Link className={styles.viewMore}>Ver todas</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
