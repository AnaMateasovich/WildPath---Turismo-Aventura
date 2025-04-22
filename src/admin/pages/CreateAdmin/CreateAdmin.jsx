import React, { useState } from "react";
import styles from "./CreateAdmin.module.css";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../../components/Button/Button";
import { Textarea } from "../../components/Textarea/Textarea";
import { fakeListCategoriesForm } from "../../../data/db";
import { InputAddList } from "../../components/InputAddList/InputAddList";
import { FormSchedule } from "../../components/FormSchedule/FormSchedule";
import { FormImg } from "../../components/FormImg/FormImg";
import { FormDates } from "../../components/FormDates/FormDates";

const CreateAdmin = () => {
  const [currentStep, setCurrentStep] = useState(4);

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
        <div className={styles.btnSubmitContainer}>
          <button type="submit" className={styles.btnSubmit}>
            Crear
          </button>
        </div>
      </aside>

      <div className={styles.form}>
        {/* PRIMER PARTE - DATOS DE LA EMPRESA */}
        {currentStep === 1 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Datos de la Empresa</h3>
              <Button text="Crear empresa" className={styles.btnCreate} />
            </div>
            <div className={styles.formInputs}>
              <Input
                labelName="Nombre"
                placeholder="Patagonia Adventures"
                type="text"
              />
              <Input
                labelName="CUIT / RUC / NIT"
                placeholder="30-12345678-9"
                type="text"
              />
              <Input
                labelName="Email"
                placeholder="contacto@patagonia.com"
                type="text"
              />
              <Input
                labelName="Teléfono"
                placeholder="+54 9 11 1234 5678"
                type="text"
              />
              <Input
                labelName="Dirección"
                placeholder="Av. Libertador 1234, Buenos Aires"
                type="text"
              />
              <Input
                labelName="Redes Sociales"
                placeholder="@patagoniaadventures"
                type="text"
              />

              <Textarea
                labelName="Descripción"
                placeholder="Empresa dedicada a organizar actividades de aventura en la Patagonia."
              />
            </div>
           
          </div>
        )}
        {/* SEGUNDA PARTE - DATOS DEL PAQUETE */}
        {currentStep === 2 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Datos del Paquete</h3>
              <Button text="Crear categoría" className={styles.btnCreate} />
            </div>
            <div className={styles.formInputs}>
              <Input
                labelName="Nombre del Paquete"
                placeholder="Excursión al Glaciar Perito Moreno"
                type="text"
              />
              <Select
                labelName="Categoría"
                options={fakeListCategoriesForm.map((category) => ({
                  value: category.value,
                  label: category.label,
                }))}
              />
              <Input
                labelName="Duración"
                placeholder="3 días / 2 noches"
                type="text"
              />
              <Textarea
                labelName="Descripción completa"
                placeholder="Una aventura inolvidable en los glaciares de la Patagonia..."
              />

              <FormSchedule />
              <InputAddList
                titleSection="Incluye"
                nameLabel="Item"
                placeholder="Traslados, alojamiento, comidas"
                type="text"
                htmlFor="Incluye"
                note="Añade cada ítem por separado."
              />
              <InputAddList
                titleSection="NO Incluye"
                nameLabel="Item"
                placeholder="Entradas a parques, gastos personales"
                type="text"
                htmlFor="NoIncluye"
                note="Añade cada ítem por separado."
              />
              <Input
                labelName="Destino / Ubicación"
                placeholder="El Calafate, Santa Cruz, Argentina"
                type="text"
              />
              <Input
                labelName="Precio por Persona"
                placeholder="USD 300"
                type="text"
              />
              <Input
                labelName="Descuento"
                placeholder="10%, 20% off"
                type="text"
              />
              <Select
                labelName="Dificultad"
                options={[
                  { value: "principiante", label: "Principiante" },
                  { value: "intermedio", label: "Intermedio" },
                  { value: "avanzado", label: "Avanzado" },
                ]}
              />

              <Textarea
                labelName="Política de Cancelación"
                placeholder="Cancelaciones gratuitas hasta 48 hs antes."
              />
            </div>
           
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

        {/* CUARTA PARTE - MULTIMEDIA */}
        {currentStep === 4 && (
          <div>
            <div className={styles.titleBtnContainer}>
              <h3>Fechas y cupos</h3>
            </div>
            <div className={styles.formInputs}>
              <FormDates />
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
        </div>
      </div>
    </form>
  );
};

export default CreateAdmin;
