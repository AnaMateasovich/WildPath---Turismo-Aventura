import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { FormDatesAvailable } from "../../components/FormDatesAvailable/FormDatesAvailable";
import { FormEnterprise } from "../../components/FormEnterprise/FormEnterprise";
import { FormImg } from "../../components/FormImg/FormImg";
import { FormPackage } from "../../components/FormPackage/FormPackage";
import { FormRequirements } from "../../components/FormRequirements/FormRequirements";
import { ReviewAndSubmit } from "../../components/ReviewAndSubmit/ReviewAndSubmit";
import { useImages } from "../../context/ImagesContext";
import { useIncludes } from "../../context/IncludesContext";
import { saveFullForm } from "../../redux/features/FullFormCreate/formThunk";
import styles from "./CreateFullFormAdmin.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateFullFormAdmin = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const formData = useSelector((state) => state.fullForm);
  const status = useSelector((state) => state.fullForm.status);
  const isLoading = status === "loading";
  const { packageIncludes, noIncludes } = useIncludes();
  const { images } = useImages();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(
        saveFullForm({ packageIncludes, noIncludes, images })
      );
      if (saveFullForm.fulfilled.match(resultAction)) {
        toast.success("Formulario guardado con éxito");
        setTimeout(() => navigate('/admin/actividades/crear'), 1000);
      } else {
        toast.error("Ocurrio un error al guardar el formulario");
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error(error);
    }
  };

  return (
    <form action="" className={styles.container}>
      <aside className={styles.sidebarSteps}>
        <h1>Crear</h1>
        <ul className={styles.stepsList}>
          <li className={styles.step}>
            <span className={styles.numberStep}>1</span>
            <span className={styles.textStep}>Datos de la empresa</span>
          </li>
          <li className={styles.step}>
            <span className={styles.numberStep}>2</span>
            <span className={styles.textStep}>Datos del paquete</span>
          </li>
          <li className={styles.step}>
            <span className={styles.numberStep}>3</span>
            <span className={styles.textStep}>Multimedia</span>
          </li>
          <li className={styles.step}>
            <span className={styles.numberStep}>4</span>
            <span className={styles.textStep}>Fechas disponibles</span>
          </li>
          <li className={styles.step}>
            <span className={styles.numberStep}>5</span>
            <span className={styles.textStep}>Requisitos / Restricciones</span>
          </li>
          <li className={styles.step}>
            <span className={styles.numberStep}>6</span>
            <span className={styles.textStep}>Revisar y Terminar</span>
          </li>
        </ul>
      </aside>

      <div className={styles.form}>
        {/* PRIMER PARTE - DATOS DE LA EMPRESA */}
        {currentStep === 1 && (
          <div>
            <FormEnterprise />
          </div>
        )}
        {/* SEGUNDA PARTE - DATOS DEL PAQUETE */}
        {currentStep === 2 && (
          <div>
            <FormPackage />
          </div>
        )}

        {/* TERCERA PARTE - MULTIMEDIA */}
        {currentStep === 3 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Multimedia</h3>
            </div>
            <div className={styles.formInputs}>
              <FormImg />
            </div>
          </div>
        )}

        {/* CUARTA PARTE - FECHAS DISPONIBLES */}
        {currentStep === 4 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Fechas y cupos</h3>
            </div>
            <div className={styles.formInputs}>
              <FormDatesAvailable />
            </div>
          </div>
        )}

        {/* QUINTA PARTE - REQUISITOS Y RESTRICCIONES */}
        {currentStep === 5 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Requisitos y Restricciones</h3>
            </div>
            <div>
              <FormRequirements />
            </div>
          </div>
        )}
        {/* SEXTA PARTE - REVISAR Y TERMINAR */}
        {currentStep === 6 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Revisar y Terminar</h3>
            </div>
            <div>
              <ReviewAndSubmit />
            </div>
          </div>
        )}

        <div className={styles.btnsContainer}>
          {currentStep > 1 && (
            <div>
              <Button
                text="Anterior"
                className={styles.btnPrev}
                onClick={() => setCurrentStep(currentStep - 1)}
                type="button"
              />
            </div>
          )}

          {currentStep < 6 && (
            <div className={`${currentStep === 1 && styles.btnNextPageOne}`}>
              <Button
                text="Siguiente"
                className={styles.btnNext}
                onClick={() => setCurrentStep(currentStep + 1)}
                type="button"
              />
            </div>
          )}
          {currentStep === 6 && (
            <div className={`${currentStep === 1 && styles.btnNextPageOne}`}>
              <Button
                text={isLoading ? "Guardando..." : "Crear"}
                className={styles.btnNext}
                onClick={handleSubmit}
                type="button"
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateFullFormAdmin;
