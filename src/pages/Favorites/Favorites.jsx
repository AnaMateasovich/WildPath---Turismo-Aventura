import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFavorite,
} from "../../admin/redux/features/favorites/favoritesThunk";
import styles from "./Favorites.module.css";
import { ListCard } from "../../components/ListCard/ListCard";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favorites, favoriteIds, favoriteMap } = useSelector(
    (state) => state.favorites
  );

  const handleRemoveById = (pkgId) => {
    dispatch(removeFavorite(pkgId));
  };
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de favoritos</h2>
      {favorites.length === 0 && (
        <>
          <p>No hay favoritos</p>
          <Button onClick={() => navigate("/actividades")} className={styles.viewListBtn} text="Ver actividades" />
        </>
      )}
      {favorites.map((pkg) => (
        <div className={styles.favoritePkgContainer} key={pkg.id}>
          <ListCard
            image={
              pkg.images && pkg.images.length > 0
                ? pkg.images[0].src
                : "localhost:5173/src/assets/logo-bg.jpg"
            }
            title={pkg.name}
            location={pkg.locationAddress}
            valoration="Excelente"
            points="4,9"
            // commQuantity={pkg.comments}
            days={pkg.duration}
            price={`USD ${pkg.pricePerPerson}`}
            id={pkg.id}
            datesAvailable={pkg.datesAvailable}
          />
          <Button
            text="Eliminar de favoritos"
            className={styles.btnRemoveFavorite}
            onClick={() => handleRemoveById(pkg.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Favorites;
