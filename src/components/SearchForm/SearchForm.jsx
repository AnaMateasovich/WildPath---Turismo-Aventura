import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../admin/redux/features/categories/categoriesThunks";

export const SearchForm = ({ className }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <form className={`${className} ${styles.searchForm}`}>
      <div className={styles.form}>
        <input
          type="text"
          className={styles.location}
          placeholder="Ingrese una ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          value={category}
          className={styles.category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" >
            Tipo de aventura
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="date" className={styles.date} value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <Button type="submit" text="Buscar" className={styles.btnSearch} />
    </form>
  );
};
