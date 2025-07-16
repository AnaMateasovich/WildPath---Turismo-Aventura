import React, { useEffect, useState, useMemo } from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../admin/redux/features/categories/categoriesThunks";
import {
  searchFiltered,
  getLocationSuggestions,
} from "../../admin/redux/features/packages/packageThunk";
import debounce from "lodash/debounce";
import {
  cleanFiltered,
  clearLocationSuggestions,
  setPendingSearch,
} from "../../admin/redux/features/packages/packagesSlice";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useNavigate } from "react-router-dom";

export const SearchForm = ({ className }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const { locationSuggestions, isFiltered } = useSelector(
    (state) => state.packages
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = { location, categoryId: category, startDate, endDate };

    if (window.location.pathname !== "/") {
      dispatch(setPendingSearch(searchParams));
      navigate("/");
    } else {
      dispatch(searchFiltered(searchParams));
      setTimeout(() => window.scrollTo({ top: 300, behavior: "smooth" }), 100);
    }
  };

  const handleSelectedSuggestion = (location) => {
    setLocation(location);
    setSelectedSuggestion(location);
    dispatch(clearLocationSuggestions());
  };

  const onChangeInputLocation = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length >= 2) {
      debouncedGetSuggestions(value);
    } else {
      dispatch(clearLocationSuggestions());
    }
  };

  const handleClearSearchForm = () => {
    dispatch(cleanFiltered());
    setLocation("");
    setCategory("");
    setStartDate("");
    setEndDate("");
  };

  const debouncedGetSuggestions = useMemo(() => {
    return debounce((query) => {
      dispatch(getLocationSuggestions({ query }));
    }, 400);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      debouncedGetSuggestions.cancel();
    };
  }, [debouncedGetSuggestions]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <form
      className={`${className} ${styles.searchForm}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.locationContainer}>
        <label htmlFor="">Ingresa una ubicación</label>
        <input
          type="text"
          className={styles.location}
          placeholder="Ej: Mendoza"
          value={location}
          onChange={onChangeInputLocation}
          onBlur={() =>
            setTimeout(() => dispatch(clearLocationSuggestions()), 150)
          }
        />
        {locationSuggestions.length > 0 &&
          location.trim() &&
          selectedSuggestion !== location && (
            <ul className={styles.suggestionList}>
              {locationSuggestions.map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectedSuggestion(location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className={styles.categoryContainer}>
        <label htmlFor="">Elige por categoría</label>
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
      </div>
      <div className={styles.startDateContainer}>
        <label htmlFor="">Desde</label>

        <input
          type="date"
          className={styles.startDate}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className={styles.endDateContainer}>
        <label htmlFor="">Hasta</label>

        <input
          type="date"
          className={styles.endDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
        />
      </div>
      <div className={styles.btnsContainer}>
        <Button type="submit" text="Buscar" className={styles.btnSearch} />
        {isFiltered && (
          <div className={styles.clearFiltered}>
            <ClearRoundedIcon
              style={{ fontSize: "3rem" }}
              onClick={handleClearSearchForm}
            />
          </div>
        )}
      </div>
    </form>
  );
};
