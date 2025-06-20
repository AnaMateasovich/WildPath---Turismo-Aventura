import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../admin/redux/features/categories/categoriesThunks";
import { fetchTravelPackagesPaginated, filterByCategory } from "../../admin/redux/features/packages/packageThunk";
import { useNavigate } from "react-router-dom";
import { cleanFiltered } from "../../admin/redux/features/packages/packagesSlice";

export const SearchForm = ({ className }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const { packages, isFiltered } = useSelector((state) => state.packages);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      navigate(`/actividades`);
      dispatch(filterByCategory(category));
    }
  };

  const cleanSearch = (e) => {
    e.preventDefault();
    dispatch(cleanFiltered());
    setCategory("");
    setLocation("");
    setDate("");
    navigate("/actividades");
    dispatch(fetchTravelPackagesPaginated({ page: 0, size: 3 }
))
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <form
      className={`${className} ${styles.searchForm}`}
      onSubmit={handleSubmit}
    >
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
        <option value="">Tipo de aventura</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        className={styles.date}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button type="submit" text="Buscar" className={styles.btnSearch} />
      {isFiltered && (
        <Button
          text="Limpiar busqueda"
          className={styles.btnCleanSearch}
          onClick={cleanSearch}
        />
      )}
    </form>
  );
};
