import React from "react";
import styles from "./ListProducts.module.css";
import { ProductFilter } from "../../components/ProductFilter/ProductFilter";
import { ListCard } from "../../components/ListCard/ListCard";
import { listProducts } from "../../data/db";
import { HeroLight } from "../../layouts/HeroLight/HeroLight";
import { Pagination } from "../../components/Pagination/Pagination";

const ListProducts = () => {
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
              {listProducts.map((product) => (
                <ListCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  location={product.location}
                  valoration={product.valoration}
                  points={product.points}
                  commQuantity={product.comments}
                  days={product.days}
                  price={product.price}
                />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination cPage="2" totalPages="16" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ListProducts;
