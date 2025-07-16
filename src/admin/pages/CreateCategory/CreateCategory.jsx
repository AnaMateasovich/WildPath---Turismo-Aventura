import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/Textarea/Textarea";
import styles from "./CreateCategory.module.css";
import { resetCategoryForm, updateCategory } from "../../redux/features/categories/categoriesSlice";
import { FormImg } from "../../components/FormImg/FormImg";
import { useImages } from "../../context/ImagesContext";
import { createCategory } from "../../redux/features/categories/categoriesThunks";
import { useNavigate, useNavigationType } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [view, setView] = useState("Create");

  const { category } = useSelector((state) => state.categories);
  const status = useSelector((state) => state.categories.status);
  const isLoading = status === "loading";
  const { previews, images, clearImages } = useImages();

  const selectedImage = images?.category[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCategory({ [name]: value }));
  };



  const handleCreateCategory = async () => {
    if (!selectedImage) {
      console.error("No se ha seleccionado una imagen.");
      return;
    }
    try {
      const result = await dispatch(
        createCategory({ category, image: selectedImage })
      ).unwrap();
      if(result) {
        toast.success("Categoría creada correctamente");
        dispatch(resetCategoryForm());
        clearImages()
        setView("Create")
      }

    } catch (error) {
      toast.error("Hubo al crear la categoría");
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnBackContainer}>
        <Button text="Volver" onClick={() => navigate('/admin/categories')} />
      </div>
      <main>
        {view === "Create" ? (
          <section>
            <h3 className={styles.title}>Crear nueva categoría</h3>
            <div className={styles.categoryForm}>
              <Input
                htmlFor=""
                labelName="Nombre"
                placeholder="Esquí, Surf, Parapente..."
                type="text"
                value={category.name}
                onChange={handleChange}
                inputName="name"
                id="categoryName"
              />
              <Textarea
                className={styles.description}
                htmlFor=""
                labelName="Descripción"
                placeholder="Vive la emoción de deslizarte por pistas nevadas, siente el aire fresco en tu rostro y maravíllate con la belleza del paisaje invernal. Ya seas principiante o experto, el esquí te brinda aventura, diversión y recuerdos inolvidables en un entorno mágico."
                inputName="description"
                value={category.description}
                onChange={handleChange}
                id="categoryDescription"
              />
              <FormImg maxImages={1} maxFileSizeMB={2} type="category" />
             
              <div className={styles.btnBackContainer}>
                <Button
                  text="Siguiente"
                  onClick={() => setView("Review and Submit")}
                />
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.reviewAndSubmit}>
            <h3 className={styles.title}>Revisar y terminar</h3>
            <p>
              <strong>Nombre: </strong>
              {category.name}
            </p>
            <p>
              <strong>Descripción: </strong>
              {category.description}
            </p>
            <p>
              <strong>Imágen: </strong>
              {previews.category.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image${index + 1}`}
                  className={styles.img}
                  loading="lazy"
                />
              ))}
            </p>
            <div className={styles.btnsCreateBackContainer}>
              <Button
                text={"Atras"}
                onClick={() => setView("Create")}
              />
              <Button
                text={isLoading ? "Creando..." : "Crear"}
                onClick={handleCreateCategory}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CreateCategory;
