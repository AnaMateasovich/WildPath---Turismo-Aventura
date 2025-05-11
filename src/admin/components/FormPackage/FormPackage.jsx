import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { fakeListCategoriesForm, fakeListPlace } from "../../../data/db";
import { useIncludes } from "../../context/IncludesContext";
import styles from "../../pages/CreateAdmin/CreateAdmin.module.css";
import {
  updatePackage
} from "../../redux/features/FullFormCreate/formSlice";
import { FormSchedule } from "../FormSchedule/FormSchedule";
import { Input } from "../Input/Input";
import { InputAddList } from "../InputAddList/InputAddList";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";
import { fetchCategories } from "../../redux/features/categories/categoriesThunks";
import { fetchPlaces } from "../../redux/features/places/placesThunks";

export const FormPackage = () => {
  const dispatch = useDispatch();
  const packageForm = useSelector((state) => state.fullForm.package);
  const categories = useSelector((state) => state.categories.categories)
  const places = useSelector((state) => state.places.places)

  const {includes, noIncludes, setIncludes, setNoIncludes} = useIncludes()

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePackage({ [name]: value }));
  };

  const handleAddInclude = (newItem) => {
    setIncludes((prev) => [...prev, newItem]);
  };

  const handleRemoveInclude = (index) => {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddNoInclude = (newItem) => {
    setNoIncludes((prev) => [...prev, newItem]);
  };

  const handleRemoveNoInclude = (index) => {
    setNoIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchPlaces())
  }, [dispatch])
  
  return (
    <>
      <div className={styles.titleBtnContainer}>
        <h3>Datos del Paquete</h3>
        <Button text="Crear categoría" className={styles.btn} />
      </div>
      <div className={styles.formInputs}>
        <Input
          labelName="Nombre del Paquete"
          placeholder="Excursión al Glaciar Perito Moreno"
          type="text"
          onChange={handleChange}
          value={packageForm.name}
          inputName="name"
        />
        <Select
          labelName="Categoría"
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          htmlFor="categoria"
          selectName="category"
          value={packageForm.category}
          onChange={handleChange}
        />
        <Select
          labelName="Tipo de lugar"
          options={places.map((place) => ({
            value: place.id,
            label: place.name,
          }))}
          selectName="place"
          htmlFor="TipoDeLugar"
          value={packageForm.place}
          onChange={handleChange}
        />
        <Input
          labelName="Duración"
          placeholder="3 días / 2 noches"
          type="text"
          onChange={handleChange}
          value={packageForm.duration}
          inputName="duration"
        />
        <FormSchedule />
        <InputAddList
          titleSection="Incluye"
          nameLabel="Item"
          placeholder="Traslados, alojamiento, comidas"
          type="text"
          htmlFor="Incluye"
          note="Añade de a un item con su respectivo icono. Los iconos deben ser subidos en formato de imagen (por ejemplo, PNG o JPG) y no deben superar un tamaño de 4KB"
          onAddItem={handleAddInclude}
          onRemoveItem={handleRemoveInclude}
          inputName="include"
          itemsState={includes}
        />
        <InputAddList
          titleSection="NO Incluye"
          nameLabel="Item"
          placeholder="Entradas a parques, gastos personales"
          type="text"
          htmlFor="NoIncluye"
          note="Añade de a un item con su respectivo icono. Los iconos deben ser subidos en formato de imagen (por ejemplo, PNG o JPG) y no deben superar un tamaño de 4KB"
          onAddItem={handleAddNoInclude}
          onRemoveItem={handleRemoveNoInclude}
          inputName="noInclude"
          itemsState={noIncludes}

        />

        <Input
          labelName="Destino / Ubicación"
          placeholder="El Calafate, Santa Cruz, Argentina"
          type="text"
          onChange={handleChange}
          value={packageForm.locationAddress}
          inputName="locationAddress"
        />
        <Input
          labelName="Precio por Persona"
          placeholder="USD 300"
          type="number"
          onChange={handleChange}
          value={packageForm.pricePerPerson}
          inputName="pricePerPerson"
        />
        <Input
          labelName="Descuento"
          placeholder="10%, 20% off"
          type="text"
          onChange={handleChange}
          value={packageForm.discount}
          inputName="discount"
        />
        <Select
          labelName="Dificultad"
          options={[
            { value: "principiante", label: "Principiante" },
            { value: "intermedio", label: "Intermedio" },
            { value: "avanzado", label: "Avanzado" },
          ]}
          selectName="difficulty"
          htmlFor="Dificultad"
          value={packageForm.difficulty}
          onChange={handleChange}
        />

        <Textarea
          labelName="Política de Cancelación"
          placeholder="Cancelaciones gratuitas hasta 48 hs antes."
          onChange={handleChange}
          value={packageForm.cancelPolicy}
          inputName="cancelPolicy"
        />
      </div>
    </>
  );
};
