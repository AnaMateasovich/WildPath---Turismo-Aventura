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
}) => {
  const { isFiltered } = useSelector((state) => state.packages);

  return (
    <div className={styles.content}>
      {!isFiltered ? (

        <h1 className={styles.title}>Todos nuestros paquetes</h1>
      ) : ( 
        <h1 className={styles.title}>Encontramos las aventuras perfectas para vos</h1>
      )}
      <div className={styles.cardsContainer}>
        {packages.map((tpackage) => {
          return (
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
          );
        })}
      </div>
      {!isFiltered && (
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
