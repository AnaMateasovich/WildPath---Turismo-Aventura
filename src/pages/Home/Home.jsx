import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  fetch10Random,
  searchFiltered,
} from "../../admin/redux/features/packages/packageThunk.js";
import { CardCategory } from "../../components/CardCategory/CardCategory";
import { RecCard } from "../../components/RecCard/RecCard";
import { SearchForm } from "../../components/SearchForm/SearchForm.jsx";
import styles from "./Home.module.css";
import { useWindowSize } from "../../hooks/useWindowSize.js";
import { ProductsList } from "../../components/ProductsList/ProductsList.jsx";
import { cleanFiltered, clearPendingSearch } from "../../admin/redux/features/packages/packagesSlice.js";
import { Button } from "../../components/Button/Button.jsx";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { random, filteredPackages } = useSelector((state) => state.packages);
  const categories = useSelector((state) => state.categories.categories);
  const reviews = useSelector((state) => state.reviews.reviews);
  const pendingSearch = useSelector((state) => state.packages.pendingSearch);

  const navigate = useNavigate();
  const width = useWindowSize();

  useEffect(() => {
    dispatch(fetch10Random());
    return () => {
      dispatch(cleanFiltered());
    };
  }, [dispatch]);

  useEffect(() => {
    if (pendingSearch) {
      dispatch(searchFiltered(pendingSearch));
      setTimeout(() => window.scrollTo({ top: 300, behavior: "smooth" }), 100);
      dispatch(clearPendingSearch());
    }
  }, [pendingSearch, dispatch]);
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
            loop={false}
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
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  img={category.src}
                  alt={category.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.viewMoreContainer}>
            <Link to="/categorias" className={styles.viewMore}>
              Ver todas
            </Link>
          </div>
        </div>
        {filteredPackages.length > 0 && (
          <div className={styles.filteredList}>
            {/* <Button text="Limpiar busqueda"/> */}
            <ProductsList
              packages={filteredPackages}
              valoration={reviews.averageStars}
              // totalPages={totalPages}
              // onPrev={handlePrevPage}
              // onNext={handleNextPage}
              // currentPage={currentPage}
            />
          </div>
        )}
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
                          : "localhost:5173/src/assets/logo-bg.jpg"
                      }
                      price={pkg.pricePerPerson}
                      alt={pkg.name}
                      ubi={pkg.locationAddress}
                      valoration={pkg.averageStars}
                      totalReviews={pkg.totalReviews}
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
                      : "localhost:5173/src/assets/logo-bg.jpg"
                  }
                  price={pkg.pricePerPerson}
                  alt={pkg.name}
                  ubi={pkg.locationAddress}
                  valoration={pkg.averageStars}
                  title={pkg.name}
                  duration={pkg.duration}
                  onClickBtn={() => navigate(`/actividades/${pkg.id}`)}
                  className={styles.recCard}
                  totalReviews={pkg.totalReviews}
                />
              ))}
            </div>
          )}
          <div className={styles.viewMoreContainerRec}>
            <Link to="/actividades" className={styles.viewMore}>
              Ver todas
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
