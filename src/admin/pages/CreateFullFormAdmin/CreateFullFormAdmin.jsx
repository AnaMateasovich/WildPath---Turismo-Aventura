import React, { useEffect, useState } from "react";
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
  const [checkStep, setCheckStep] = useState({
    enterprise: false,
    package: false,
    media: false,
    dates: false,
    requirements: false,
    review: false
  });
  const [errorMessage, setErrorMessage] = useState({
    enterprise: '',
    package: '',
    media: '',
    dates: '',
    requirements: '',
  })

  const formData = useSelector((state) => state.fullForm);
  const status = useSelector((state) => state.fullForm.status);

  const isLoading = status === "loading";

  const { packageIncludes, noIncludes } = useIncludes();
  const { images } = useImages();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(formData)

  const packageImages = images.package

  const handleSubmit = async () => {
    const allStepsComplete = Object.values(checkStep).every((step) => step === true);
    if (!allStepsComplete) {
      toast.error("Por favor, completa todos los pasos antes de continuar.");
      return;
    }
    try {
      const resultAction = await dispatch(
        saveFullForm({ packageIncludes, noIncludes, images: packageImages })
      );
      if (saveFullForm.fulfilled.match(resultAction)) {
        toast.success("Formulario guardado con éxito");
        setTimeout(() => navigate("/admin/actividades/crear"), 1000);
      } else {
        toast.error("Ocurrio un error al guardar el formulario");
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error(error);
    }
  };

  const validateEnterprise = () => {
    const e = formData.enterpriseForm;
    if (e?.name?.trim() && e?.cuit?.trim() && e?.email?.trim() && e?.phone?.trim() && e?.address?.trim()) {
      setCheckStep((prev) => ({ ...prev, enterprise: true }));
      setErrorMessage((prev) => ({ ...prev, enterprise: '' }));
    } else if(currentStep > 1) {
      setCheckStep((prev) => ({ ...prev, enterprise: false }));
      setErrorMessage((prev) => ({ ...prev, enterprise: "Tienes campos obligatorios vacíos en empresa" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, enterprise: '' }));

    }
  };

  const validatePackage = () => {
    const p = formData.package;
    if (
      p?.name?.trim() &&
      p?.cancelPolicy?.trim() &&
      p?.category?.trim() &&
      p?.description?.trim() &&
      p?.difficulty?.trim() &&
      (p?.discount !== undefined && p.discount !== "") &&
      (
        p?.duration?.days ||
        p?.duration?.hours ||
        p?.duration?.minutes ||
        p?.duration?.nights
      ) &&
      p?.place?.trim() &&
      (p?.pricePerPerson !== undefined && p.pricePerPerson !== "") &&
      packageIncludes.length > 0
    ) {
      setCheckStep((prev) => ({ ...prev, package: true }));
      setErrorMessage((prev) => ({ ...prev, package: '' }));
    } else if(currentStep > 2) {
      setCheckStep((prev) => ({ ...prev, package: false }));
      setErrorMessage((prev) => ({ ...prev, package: "Tienes campos obligatorios vacíos en paquete" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, package: '' }));

    }
  };

  const validateMedia = () => {
    if (packageImages.length > 0) {
      setCheckStep((prev) => ({ ...prev, media: true }));
      setErrorMessage((prev) => ({ ...prev, media: '' }));
    } else if(currentStep > 3) {
      setCheckStep((prev) => ({ ...prev, media: false }));
      setErrorMessage((prev) => ({ ...prev, media: "Tienes campos obligatorios vacíos en multimedia" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, media: '' }));

    }
  };

  const validateDates = () => {
    if (formData.datesAvailable.length > 0) {
      setCheckStep((prev) => ({ ...prev, dates: true }));
      setErrorMessage((prev) => ({ ...prev, dates: '' }));
    } else if(currentStep > 4) {
      setCheckStep((prev) => ({ ...prev, dates: false }));
      setErrorMessage((prev) => ({ ...prev, dates: "Tienes campos obligatorios vacíos en fechas disponibles" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, dates: '' }));

    }
  }; 

  const validateRequirements = () => {
    if (formData.requirements.length > 0) {
      setCheckStep((prev) => ({ ...prev, requirements: true }));
      setErrorMessage((prev) => ({ ...prev, requirements: '' }));
    } else if(currentStep > 5) {
      setCheckStep((prev) => ({ ...prev, requirements: false }));
      setErrorMessage((prev) => ({ ...prev, requirements: "Tienes campos obligatorios vacíos en requisitos" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, requirements: '' }));
    }
  };

  const validateReview = () => {
    if (currentStep === 6) {
      setCheckStep((prev) => ({ ...prev, review: true }));
    }
  };

  const checkFill = () => {
    validateEnterprise();
    validatePackage();
    validateMedia();
    validateDates();
    validateRequirements();
    validateReview();
  };


  useEffect(() => {
    checkFill()
  }, [formData.enterpriseForm, formData.package, packageIncludes, packageImages, formData.datesAvailable, formData.requirements, currentStep])
  return (
    <form action="" className={styles.container}>
      <aside className={styles.sidebarSteps}>
        <h1>Crear</h1>
        <ul className={styles.stepsList}>
          <li className={`${styles.step} ${checkStep.enterprise && styles.stepFillout}`}>
            <span className={styles.numberStep}>1</span>
            <span className={styles.textStep}>Datos de la empresa</span>
            {errorMessage.enterprise && (
              <p className={styles.stepError}>{errorMessage.enterprise}</p>
            )}
          </li>
          <li className={`${styles.step} ${checkStep.package && styles.stepFillout}`}>
            <span className={styles.numberStep}>2</span>
            <span className={styles.textStep}>Datos del paquete</span>
            {errorMessage.package && (
              <p className={styles.stepError}>{errorMessage.package}</p>
            )}
          </li>

          <li className={`${styles.step} ${checkStep.media && styles.stepFillout}`}>
            <span className={styles.numberStep}>3</span>
            <span className={styles.textStep}>Multimedia</span>
            {errorMessage.media && (
              <p className={styles.stepError}>{errorMessage.media}</p>
            )}
          </li>

          <li className={`${styles.step} ${checkStep.dates && styles.stepFillout}`}>
            <span className={styles.numberStep}>4</span>
            <span className={styles.textStep}>Fechas disponibles</span>
            {errorMessage.dates && (
              <p className={styles.stepError}>{errorMessage.dates}</p>
            )}
          </li>

          <li className={`${styles.step} ${checkStep.requirements && styles.stepFillout}`}>
            <span className={styles.numberStep}>5</span>
            <span className={styles.textStep}>Requisitos / Restricciones</span>
            {errorMessage.requirements && (
              <p className={styles.stepError}>{errorMessage.requirements}</p>
            )}
          </li>
          <li className={`${styles.step} ${checkStep.review && styles.stepFillout}`}>
            <span className={styles.numberStep}>6</span>
            <span className={styles.textStep}>Revisar y Terminar</span>
          </li>
        </ul>
      </aside>

      <main className={styles.form}>
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
              <FormImg
                type="package"
                nameLabel="Imágenes del paquete"
                maxImages={5}
                maxFileSizeMB={2}
              />
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
                id="nextButton"
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
                id="submitFullForm"
              />
            </div>
          )}
        </div>
      </main>
    </form>
  );
};

export default CreateFullFormAdmin;
