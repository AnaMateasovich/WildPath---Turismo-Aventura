import React from "react";
import styles from "./ProductsList.module.css";
import { Pagination } from "../Pagination/Pagination";
import { ListCard } from "../ListCard/ListCard";
import { useSelector } from "react-redux";

export const ProductsList = ({
  packages,
  currentPage,
  totalPages,
  onPrev,
  onNext,
  title = "Encontramos las aventuras perfectas para vos"
}) => {
  const { filteredPackages } = useSelector((state) => state.packages);

  return (
    <div className={styles.content}>
      {!filteredPackages ? (
        <h1 className={styles.title}>Todos nuestros paquetes</h1>
      ) : (
        <h1 className={styles.title}>{title}</h1>
      )}
      <div className={styles.cardsContainer}>
        {packages.map((tpackage) => {

          

          return (
            <ListCard
              key={tpackage.id}
              image={
                tpackage.images && tpackage.images.length > 0
                  ? tpackage.images[0].src
                  : "localhost:5173localhost:5173/src/assets/logo-bg.jpg"
              }
              title={tpackage.name}
              location={tpackage.locationAddress}
              valoration={tpackage.averageStars}
              days={tpackage.duration}
              totalReviews={tpackage.totalReviews}
              price={`USD ${tpackage.pricePerPerson}`}
              id={tpackage.id}
              datesAvailable={tpackage.datesAvailable}
            />
          );
        })}
      </div>
      {filteredPackages.length === 0 && totalPages && (
        <div className={styles.pagination}>
          <Pagination
            cPage={currentPage + 1}
            totalPages={totalPages}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      )}
    </div>
  );
};
