import React, { useEffect, useState } from "react";
import styles from "./ProductFeatures.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPackageById } from "../../redux/features/packages/packageThunk";
import { clearSelectedPackage } from "../../redux/features/packages/packagesSlice";
import { API_URL } from "../../redux/features/FullFormCreate/formSlice";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "../../../components/Button/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { InputListWithIcons } from "../../components/InputListWithIcons/InputListWithIcons";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";
import { useIncludes } from "../../context/IncludesContext";
import { saveIncludes } from "../../../api/helpers/apiHelpers";
import {
  deleteIncludeById,
  saveIncludeWithPackageId,
  updatePackageInclude,
} from "../../redux/features/packageIncludes/packageIncludesThunk";
import { toast } from "react-toastify";

const ProductFeatures = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [onEdit, setOnEdit] = useState(false);
  const [selectedInclude, setSelectedInclude] = useState(null);

  const { selectedPackage, loading } = useSelector((state) => state.packages);
  const { setPackageIncludes, packageIncludes } = useIncludes();

  const onAddItem = (item) => {
    setPackageIncludes((prev) => [...prev, item]);
  };

  const onRemoveItem = (index) => {
    if (selectedInclude) {
      onCancelModal()
    }
    setPackageIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  const handelDeleteInclude = (item, packageId) => {
    const confirm = window.confirm(
      "Seguro que quieres eliminar la caracteristica " + item.description
    );
    if (confirm) {
      dispatch(deleteIncludeById(item.id))
        .unwrap()
        .then(() => {
          toast.success("Característica eliminada");
          dispatch(fetchPackageById(packageId));
        })
        .catch((error) => {
          toast.error("No se pudo eliminar la característica");
          console.error(error);
        });
    }
  };
  const handleSaveIncludes = async (packageId, packageIncludes) => {
    if(selectedInclude) {
      dispatch(updatePackageInclude({include: packageIncludes, packageId: packageId}))
      .unwrap()
      .then(() => {
        toast.success("Característica actualizada con éxito");
        dispatch(fetchPackageById(packageId));
        setSelectedInclude(null)
        setPackageIncludes([])
      })
      .catch((error) => {
        toast.error("Ocurrio un error al guardar");
        console.error(error);
      });
    } else {
      dispatch(
        saveIncludeWithPackageId({ packageId: packageId, packageIncludes })
      )
      .unwrap()
      .then(() => {
        toast.success("Características agregadas");
        dispatch(fetchPackageById(packageId));
        setPackageIncludes([])
      })
      .catch((error) => {
        toast.error("Ocurrio un error al guardar");
        console.error(error);
      });
    }
    setOnEdit(false);
      setSelectedInclude(null);
  };

  const onCancelModal = () => {
    setOnEdit(false);
    setSelectedInclude(null);
    setPackageIncludes([])
  };

  const handleEditInclude = (include) => {
    setSelectedInclude(include);
    setOnEdit(true);
  };

  useEffect(() => {
    dispatch(fetchPackageById(id));
    return () => dispatch(clearSelectedPackage());
  }, [dispatch, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <main className={styles.container}>
      <h2>{selectedPackage?.name}</h2>
      <div className={styles.textInline}>
        <h4>Ubicación</h4>
        <p>{selectedPackage?.locationAddress}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Empresa</h4>
        <p>{selectedPackage?.enterpriseName}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Categoría</h4>
        <p>{selectedPackage?.categoryName}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Lugar</h4>
        <p>{selectedPackage?.placeName}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Dificultad</h4>
        <p>{selectedPackage?.difficulty}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div>
        <div className={styles.textInline}>
          <h4>Descripción:</h4>
          {/* <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button> */}
        </div>
        <p>{selectedPackage?.description}</p>
      </div>

      <h4>Características:</h4>
      <ul>
        {selectedPackage?.packageIncludes?.map((include) => (
          <li className={styles.itemInclude} key={include.id}>
            <img src={`${API_URL}${include.iconSrc}`} alt="" loading="lazy"/>
            {include.description}
            <button onClick={() => handleEditInclude(include)}>
              <EditRoundedIcon style={{ fontSize: "2rem" }} />
            </button>
            <button onClick={() => handelDeleteInclude(include, id)}>
              <DeleteRoundedIcon style={{ fontSize: "2rem" }} />
            </button>
          </li>
        ))}
        {!onEdit && (
          <Button
            text="Añadir característica"
            className={styles.buttonBackground}
            onClick={() => setOnEdit(true)}
          />
        )}
        {onEdit && (
          <ModalWindow
            onCancel={onCancelModal}
            onSave={() => handleSaveIncludes(id, packageIncludes)}
          >
            {selectedInclude ? (
              <InputListWithIcons
                titleSection="Agregar una nueva característica"
                htmlFor="include"
                type="text"
                nameLabel="Característica"
                inputName="caracteristica"
                placeholder="Ingrese una característica"
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
                id="include"
                itemsState={packageIncludes}
                isEditing={selectedInclude}
              />
            ) : (
              <InputListWithIcons
                titleSection="Agregar una nueva característica"
                htmlFor="include"
                type="text"
                nameLabel="Característica"
                inputName="caracteristica"
                placeholder="Ingrese una característica"
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
                id="include"
                itemsState={packageIncludes}
              />
            )}
          </ModalWindow>
        )}
      </ul>

      <div className={styles.textInline}>
        <h4>Precio por persona</h4>
        <p>${selectedPackage?.pricePerPerson}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Descuento</h4>
        <p>{selectedPackage?.discount}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div className={styles.textInline}>
        <h4>Política de cancelación</h4>
        <p>{selectedPackage?.cancelPolicy}</p>
        {/* <div>
          <button>
            <EditRoundedIcon style={{ fontSize: "2rem" }} />
          </button>
        </div> */}
      </div>
      <div>
        <h4>Restricciones y requerimientos</h4>
        <ul className={styles.requirementsContainer}>
          {selectedPackage?.requirements?.map((requirement) => (
            <li key={requirement.id}>
              <span>{requirement.title}:</span> {requirement.description}
              {/* <button>
                <EditRoundedIcon style={{ fontSize: "2rem" }} />
              </button>
              <button>
                <DeleteRoundedIcon style={{ fontSize: "2rem" }} />
              </button> */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={styles.textInline}>
          <h4>Fechas disponibles:</h4>
          {/* <button>
          <EditRoundedIcon style={{ fontSize: "2rem" }} />
        </button> */}
        </div>
        <ul className={styles.datesAvailable}>
          {selectedPackage?.dateAvailable?.map((date) => (
            <li key={date.id}>
              <span>{date.date}:</span> {date.capacity}
              {/* <button>
                <DeleteRoundedIcon style={{ fontSize: "2rem" }} />
              </button> */}
            </li>
          ))}
        </ul>
      </div>
      <h4>Imáges:</h4>
      <div className={styles.imagesContainer}>
        {selectedPackage?.images?.map((image, index) => (
          <img
            key={image.id}
            src={`${API_URL}${image.src}`}
            alt={`Image ${index + 1} ${selectedPackage.name}`}
            className={styles.image}
            loading="lazy"
          />
        ))}
      </div>
    </main>
  );
};

export default ProductFeatures;
