import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../admin/redux/features/categories/categoriesThunks";
import { Button } from "../../../components/Button/Button";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { Select } from "../../components/Select/Select";
import { TableListAdmin } from "../../components/TableListAdmin/TableListAdmin";
import { setSelectedPackage, updateEditCategory } from "../../redux/features/packages/packagesSlice";
import {
  deletePackageById,
  fetchPackages,
  updateCategory,
} from "../../redux/features/packages/packageThunk";
import styles from "./ListProductsAdmin.module.css";

import { toast } from "react-toastify";

const ListProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [onEdit, setOnEdit] = useState(null);

  const actions = [
    {
      icon: <EditRoundedIcon/>,
      label: "Editar",
      onClick: (item) => handleEditProduct(item)

    },
    {
      icon: <PauseRoundedIcon />,
      label: "Pausar",
      onClick: (item) => handlePause(item),
    },
    {
      icon: <CategoryRoundedIcon />,
      label: "Editar categoria",
      onClick: (item) => handleEditCategory(item),
    },
  ];

  const { packages, loading, editCategory } = useSelector(
    (state) => state.packages
  );
  const { categories } = useSelector((state) => state.categories);

  const goToCreatePackage = () => {
    navigate("/admin/actividades/crear");
  };

  const handleEditProduct = (item) => {
    dispatch(setSelectedPackage(item))
    navigate(`/admin/actividades/${item.id}`)
  }

  const handleEditCategory = (item) => {
    setOnEdit(item);
    dispatch(updateEditCategory({ packageId: item.id }));
  };

  const handleSubmitCategoryEdited = async () => {
    try {
      const result = await dispatch(updateCategory(editCategory));
      setOnEdit(null);
      if (updateCategory.fulfilled) {
        toast.success("Categoría actualizada con éxito");
      } else {
        toast.error("Ocurrio un error al actualizar la categoría");
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOnEdit(null);
    dispatch(updateEditCategory({ packageId: null, categoryId: null }));
  };

  const handleChangeEditCategory = (e) => {
    const { name, value } = e.target;
    dispatch(updateEditCategory({ [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchPackages());

  }, [dispatch])

  useEffect(() => {
    if (onEdit && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, onEdit, categories.length]);

  
  return (
    <div className={styles.container}>
      <div className={styles.searchCreateContainer}>
        <Searchbar />
        <Button
          text="Crear categoría +"
          className={styles.btnCreate}
          id="btnCategory"
          onClick={() => navigate(`/admin/categories/crear`)}
        />
        <Button
          text="Crear paquete +"
          className={styles.btnCreate}
          onClick={goToCreatePackage}
        />
      </div>
      <div className={styles.tableList}>
        <h1 className={styles.titleList}>Lista de actividades</h1>

        <TableListAdmin
          firstColumn="Id"
          secondColumn="Nombre"
          arr={packages}
          field1="id"
          field2="name"
          onDelete={deletePackageById}
          isLoading={loading}
          actions={actions}
          onRefresh={fetchPackages}
          messageDelete="Estas seguro que quieres eliminar el paquete con id "
        />

        {onEdit && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>{onEdit.name}</h3>
              <p>
                El paquete actualmente se encuentra en la categoría{" "}
                <strong>{onEdit.categoryName}</strong>
              </p>
              <Select
                labelName="Categoría"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                selectName="categoryId"
                htmlFor="categoria"
                value={editCategory.categoryId || ""}
                onChange={handleChangeEditCategory}
                id="editCategory"
              />
              <div className={styles.buttonsEdit}>
                <Button text="Cancelar" onClick={handleCancel} />
                <Button text="Guardar" onClick={handleSubmitCategoryEdited} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProductsAdmin;
