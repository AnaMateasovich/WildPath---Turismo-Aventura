import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { TableListAdmin } from "../../components/TableListAdmin/TableListAdmin";
import { deleteCategoryById, fetchCategories } from "../../redux/features/categories/categoriesThunks";
import styles from "./CategoriesAdmin.module.css";
import { useNavigate } from "react-router-dom";

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { categories, loading } = useSelector((state) => state.categories);



  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <div className={styles.searchBarContainer}>
        <Searchbar />
        <Button
          text="Crear categoría +"
          className={styles.btnCreateCategory}
          onClick={() => navigate("/admin/categories/crear")}
        />
      </div>
      <h1 className={styles.titleList}>Lista de categorías</h1>
      <TableListAdmin
        firstColumn="Nombre"
        secondColumn="Descripción"
        arr={categories}
        field1="name"
        field2="description"
        isLoading={loading}
        onDelete={deleteCategoryById}
        onRefresh={fetchCategories}
        messageDelete="Estas seguro que quieres eliminar la categoría"
      />
    </main>
  );
};

export default CategoriesAdmin;
