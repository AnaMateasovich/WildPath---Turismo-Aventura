import React, { useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../admin/redux/features/categories/categoriesThunks";

export const SearchForm = ({ className }) => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)

    useEffect(() => {
      dispatch(fetchCategories())
    }, [dispatch])
    
  return (
    <form className={`${className} ${styles.searchForm}`}>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.location}
          placeholder="Ingrese una ubicación"
        />
        <select value="category" className={styles.category}>
          <option value="" defaultValue="" selected>
            Tipo de aventura
          </option>
          {categories.map((category) => (
          <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="date" className={styles.date} placeholder="" />
      </div>
      <Button type="submit" text="Buscar" className={styles.btnSearch} />
    </form>
  );
};
