import React from "react";
import styles from "./ListCategories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../data/db";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import {Button } from '../../components/Button/Button'
import { useNavigate } from "react-router-dom";
import { filterByCategory } from "../../admin/redux/features/packages/packageThunk";

const ListCategories = () => {
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const listPackagesByCategory = (id) => {
    dispatch(filterByCategory(id))
    navigate("/actividades")
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };
  return (
    <main className={styles.container}>
        <h2 className={styles.title}>¿Qué tipo de aventura te inspira hoy?</h2>
        <div className={styles.cards}>

      {categories.map((category) => (
        <div key={category.id} className={styles.cardCategoryList}>
          <img
            src={`${API_URL}${category.src}`}
            alt={category.name}
            className={styles.img}
            loading="lazy"
            />
          <div className={styles.text}>
            <h4>{category.name}</h4>
            <p>{category.description}</p>
            <div className={styles.btnContainer}>
                <Button text="Ver paquetes" onClick={() => listPackagesByCategory(category.id)}/>
            </div>
          </div>
        </div>
      ))}
      </div>
    </main>
  );
};

export default ListCategories;
