import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTravelPackagesPaginated } from "../../admin/redux/features/packages/packageThunk";
import { ProductFilter } from "../../components/ProductFilter/ProductFilter";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import styles from "./ListProducts.module.css";

const ListProducts = () => {
  const dispatch = useDispatch();
  const { packages, filteredPackages, isFiltered, currentPage, totalPages } =
    useSelector((state) => state.packages);
  const reviews = useSelector((state) => state.reviews.reviews);


  const displayedPackages = isFiltered ? filteredPackages : packages;


useEffect(() => {
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  if (!isFiltered) {
    dispatch(fetchTravelPackagesPaginated({ page: 0, size: 3 }));
  }
}, [dispatch, isFiltered]);
  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(
        fetchTravelPackagesPaginated({ page: currentPage - 1, size: 3 })
      );
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(
        fetchTravelPackagesPaginated({ page: currentPage + 1, size: 3 })
      );
    }
  };

  return (
    <>
      <HeroLight />
      <section className={styles.container}>
        <div className={styles.filter}>
          <ProductFilter />
        </div>
        <div className={styles.productsList}>

        <ProductsList
          packages={displayedPackages}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          currentPage={currentPage}
          />
          </div>
      </section>
    </>
  );
};

export default ListProducts;
