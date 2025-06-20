import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetch10Random } from "../../admin/redux/features/packages/packageThunk.js";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { RecCard } from "../../components/RecCard/RecCard";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import styles from "./Home.module.css";
import { useWindowSize } from "../../hooks/useWindowSize.js";

const Home = () => {
  const dispatch = useDispatch();
  const random = useSelector((state) => state.packages.random);
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const width = useWindowSize();

  useEffect(() => {
    dispatch(fetch10Random());
  }, [dispatch]);

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
      <main className={styles.mainHome}>
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
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1350: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className={styles.swiperSlide}>
                <CardCategory
                  id = {category.id}
                  name={category.name}
                  description={category.description}
                  img={category.src}
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
          {width < 768 ? (
            <div className={styles.recCards}>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 4000 }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  550: { slidesPerView: 2, spaceBetween: 0 },
                }}
              >
                {random.map((pkg, index) => (
                  <SwiperSlide key={index} className={styles.recCard}>
                    <RecCard
                      key={index}
                      img={
                        pkg.images && pkg.images.length > 0
                          ? pkg.images[0].src
                          : "/src/assets/logo-bg.jpg"
                      }
                      price={pkg.pricePerPerson}
                      alt={pkg.name}
                      ubi={pkg.locationAddress}
                      val="Excelente"
                      title={pkg.name}
                      duration={pkg.duration}
                      onClickBtn={() => navigate(`/actividades/${pkg.id}`)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className={styles.recCards}>
              {random.map((pkg, index) => (
                <RecCard
                  key={index}
                  img={
                    pkg.images && pkg.images.length > 0
                      ? pkg.images[0].src
                      : "/src/assets/logo-bg.jpg"
                  }
                  price={pkg.pricePerPerson}
                  alt={pkg.name}
                  ubi={pkg.locationAddress}
                  val="Excelente"
                  title={pkg.name}
                  duration={pkg.duration}
                  onClickBtn={() => navigate(`/actividades/${pkg.id}`)}
                />
              ))}
            </div>
          )}
          <div className={styles.viewMoreContainerRec}>
            <Link className={styles.viewMore}>Ver todas</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
