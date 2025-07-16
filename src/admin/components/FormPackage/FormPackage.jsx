import debounce from "lodash/debounce";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIncludes } from "../../context/IncludesContext";
import styles from "../../pages/CreateFullFormAdmin/CreateFullFormAdmin.module.css";
import { fetchCategories } from "../../redux/features/categories/categoriesThunks";
import { updatePackage } from "../../redux/features/FullFormCreate/formSlice";
import { checkPackageName } from "../../redux/features/FullFormCreate/formThunk";
import { selectTransformedPackage } from "../../redux/features/packages/packageSelectors";
import { fetchPlaces } from "../../redux/features/places/placesThunks";
import { Input } from "../Input/Input";
import { InputListWithIcons } from "../InputListWithIcons/InputListWithIcons";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";

export const FormPackage = ({ isEditing = false }) => {
  const dispatch = useDispatch();

  const { exists, status, value } = useSelector(
    (state) => state.fullForm.nameCheck
  );
  const packageForm = useSelector((state) => state.fullForm.package);
  const selectedPackage = useSelector(selectTransformedPackage);
  const categories = useSelector((state) => state.categories.categories);
  const places = useSelector((state) => state.places.places);

  const { packageIncludes, setPackageIncludes } = useIncludes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePackage({ [name]: value }));
  };



  const handleAddInclude = (newItem) => {
    setPackageIncludes((prev) => [...prev, newItem]);
  };

  const handleRemoveInclude = (index) => {
    setPackageIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleAddNoInclude = (newItem) => {
  //   setNoIncludes((prev) => [...prev, newItem]);
  // };

  // const handleRemoveNoInclude = (index) => {
  //   setNoIncludes((prev) => prev.filter((_, i) => i !== index));
  // };

     const debouncedCheckName = useMemo(
    () =>
      debounce((name) => {
        dispatch(checkPackageName(name));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPlaces());
  }, [dispatch]);

   useEffect(() => {
    if (packageForm.name.trim() !== "") {
      debouncedCheckName(packageForm.name);
    }
  }, [packageForm.name, debouncedCheckName]);

  useEffect(() => {
    return () => debouncedCheckName.cancel();
  }, [debouncedCheckName]);
  return (
    <>
      <div className={styles.titleBtnContainer}>
        <h3>Datos del Paquete</h3>
      </div>
      <div className={styles.formInputs}>
        <div>
          <Input
            labelName="Nombre del Paquete"
            placeholder="Excursión al Glaciar Perito Moreno"
            type="text"
            onChange={handleChange}
            value={packageForm.name}
            inputName="name"
            htmlFor="nombreDelPaquete"
            id="packageName"
          />
          {status === "loading" && (
            <p className={styles.verifyingName}>Verificando nombre...</p>
          )}
          {packageForm.name === value && exists && (
            <p className={`${styles.verifyingName} ${styles.verifyError}`}>
              Este nombre ya esta en uso, por favor elija otro.
            </p>
          )}
          {packageForm.name === value && !exists && packageForm.name !== "" && (
            <p className={`${styles.verifyingName} ${styles.verifyOk}`}>
              Nombre disponible
            </p>
          )}
        </div>
        <Textarea
          labelName="Descripción del paquete"
          placeholder="Escribí una descripción detallada del paquete: qué se va a hacer, a quién está dirigido, qué tipo de experiencia ofrece y por qué es especial."
          onChange={handleChange}
          value={packageForm.description}
          inputName="description"
          id="packageDescription"
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
          id="packageCategory"
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
          id="packagePlace"
        />
        <h4>Duración</h4>
        <div className={styles.formDuration}>
          <Input
            labelName="Días"
            type="number"
            onChange={handleChange}
            value={packageForm.duration.days}
            inputName="days"
            id="packageDuration"
            placeholder="3"
          />
          <Input
            labelName="Noches"
            type="number"
            onChange={handleChange}
            value={packageForm.duration.nights}
            inputName="nights"
            id="packageDuration"
            placeholder="2"
          />
          <Input
            labelName="Horas"
            type="number"
            onChange={handleChange}
            value={packageForm.duration.hours}
            inputName="hours"
            id="packageDuration"
            placeholder="0"
          />
          <Input
            labelName="Minutos"
            type="number"
            onChange={handleChange}
            value={packageForm.duration.minutes}
            inputName="minutes"
            id="packageDuration"
            placeholder="0"
          />
        </div>
        <p className={styles.durationNote}>
          Solo debe poner el número para la duración. Si el paquete dura solo
          unas horas o unos minutos, ignore los demás campos.
        </p>
        {/* <FormSchedule /> */}
        <InputListWithIcons
          titleSection="Incluye"
          nameLabel="Item"
          placeholder="Traslados, alojamiento, comidas"
          type="text"
          htmlFor="Incluye"
          note="Añade de a un item con su respectivo icono. Los iconos deben ser subidos en formato de imagen (por ejemplo, PNG o JPG) y no deben superar un tamaño de 4KB"
          onAddItem={handleAddInclude}
          onRemoveItem={handleRemoveInclude}
          inputName="include"
          itemsState={packageIncludes}
          id="packageInclude"
        />
        {isEditing &&
          selectedPackage.includes.map((include) => (
            <li className={styles.listEditPackage}>
          
              <img src={include.icon} alt={include.text} loading="lazy"/>
              <p>{include.text}</p>
            </li>
          ))}
        {/* <InputListWithIcons
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

        /> */}

        <Input
          labelName="Destino / Ubicación"
          placeholder="El Calafate, Santa Cruz, Argentina"
          type="text"
          onChange={handleChange}
          value={packageForm.locationAddress}
          inputName="locationAddress"
          id="packageLocation"
        />
        <Input
          labelName="Precio por Persona"
          placeholder="USD 300"
          type="number"
          onChange={handleChange}
          value={packageForm.pricePerPerson}
          inputName="pricePerPerson"
          id="packagePrice"
        />
        <Input
          labelName="Descuento"
          placeholder="10%, 20% off"
          type="text"
          onChange={handleChange}
          value={packageForm.discount}
          inputName="discount"
          id="packageDiscount"
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
          id="packageDifficulty"
        />

        <Textarea
          labelName="Política de Cancelación"
          placeholder="Cancelaciones gratuitas hasta 48 hs antes."
          onChange={handleChange}
          value={packageForm.cancelPolicy}
          inputName="cancelPolicy"
          id="packageCancelPolicy"
        />
      </div>
    </>
  );
};
