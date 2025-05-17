import React, { useEffect } from "react";
import styles from "./ListProducts.module.css";
import { ProductFilter } from "../../components/ProductFilter/ProductFilter";
import { ListCard } from "../../components/ListCard/ListCard";
import { listProducts } from "../../data/db";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchTravelPackagesPaginated } from "../../admin/redux/features/packages/packageThunk";

const ListProducts = () => {
  const dispatch = useDispatch();
  const travelPackages = useSelector((state) => state.packages.packages);
  console.log(travelPackages);
  const currentPage = useSelector((state) => state.packages.currentPage);
  const totalPages = useSelector((state) => state.packages.totalPages);

  useEffect(() => {
    dispatch(fetchTravelPackagesPaginated({ page: 0, size: 3 }));
  }, [dispatch]);

  const handlePrevPage = () => {
    if(currentPage > 0) {
      dispatch(fetchTravelPackagesPaginated({page: currentPage - 1, size: 3}))
    }
  }

  const handleNextPage = () => {
    if(currentPage < totalPages - 1) {
      dispatch(fetchTravelPackagesPaginated({page: currentPage + 1, size: 3}))
    }
  }

  return (
    <>
      <HeroLight />
      <div className={styles.container}>
        <h1 className={styles.title}>Todos nuestros paquetes</h1>
        <section className={styles.content}>
          <div>
            <ProductFilter />
          </div>
          <div>
            <div className={styles.cardContainer}>
              {travelPackages.map((tpackage) => (
                <ListCard
                  key={tpackage.id}
                  image={
                    tpackage.images && tpackage.images.length > 0
                      ? tpackage.images[0].src
                      : "/src/assets/logo-bg.jpg"
                  }
                  title={tpackage.name}
                  location={tpackage.locationAddress}
                  valoration="Excelente"
                  points="4,9"
                  // commQuantity={tpackage.comments}
                  days={tpackage.duration}
                  price={`USD ${tpackage.pricePerPerson}`}
                />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination
                cPage={currentPage + 1}
                totalPages={totalPages}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ListProducts;
