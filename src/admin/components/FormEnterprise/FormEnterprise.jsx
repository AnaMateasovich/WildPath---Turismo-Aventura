import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import styles from "../../pages/CreateAdmin/CreateAdmin.module.css";
import {
  selectedEnterprise,
  updateEnterprise,
} from "../../redux/features/FullFormCreate/formSlice";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { fetchEnterprises } from "../../redux/features/enterprise/enterpriseThunks";

export const FormEnterprise = () => {
  const dispatch = useDispatch();
  const enterpriseForm = useSelector((state) => state.fullForm.enterpriseForm);
  const enterprises = useSelector((state) => state.enterprises.enterprises);
  const selectedEnterpriseId = useSelector(
    (state) => state.fullForm.selectedEnterpriseId
  );

  const [isOpenSelectEnterprise, setIsOpenSelectEnterprise] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateEnterprise({ [name]: value }));
  };

  const handleSelectedEnterprise = (enterprise) => {
    dispatch(selectedEnterprise(enterprise));
    setIsOpenSelectEnterprise(false);
  };

  const toggleSelectEnterprise = (e) => {
    e.preventDefault();
    setIsOpenSelectEnterprise((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchEnterprises());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.titleBtnContainer}>
        <h3>Datos de la Empresa</h3>
        <div className={styles.btnsEnterprise}>
          <Button
            text="Seleccionar empresa"
            className={`${styles.btn} ${styles.btnSelectEnterprise}`}
            onClick={toggleSelectEnterprise}
          />
          {isOpenSelectEnterprise && (
            <>
              <ul className={styles.enterpriseSelectList}>
                {enterprises.map((enterprise) => (
                  <li
                    key={enterprise.id}
                    onClick={() => handleSelectedEnterprise(enterprise)}
                  >
                    {enterprise.name}
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedEnterprise}
          <Button text="Crear empresa" className={styles.btn} />
        </div>
      </div>
      <div className={styles.formInputs}>
        <Input
          labelName="Nombre"
          placeholder="Patagonia Adventures"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.name}
          inputName="name"
          htmlFor="nombre"
          disabled={!!selectedEnterpriseId}
        />
        <Input
          labelName="CUIT / RUC / NIT"
          placeholder="30-12345678-9"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.cuit}
          inputName="cuit"
          htmlFor="cuit"
          disabled={!!selectedEnterpriseId}
        />
        <Input
          labelName="Email"
          placeholder="contacto@patagonia.com"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.email}
          inputName="email"
          htmlFor="Email"
          disabled={!!selectedEnterpriseId}
        />
        <Input
          labelName="Teléfono"
          placeholder="+54 9 11 1234 5678"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.phone}
          inputName="phone"
          htmlFor="Telefono"
          disabled={!!selectedEnterpriseId}
        />
        <Input
          labelName="Dirección"
          placeholder="Av. Libertador 1234, Buenos Aires"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.address}
          inputName="address"
          htmlFor="Direccion"
          disabled={!!selectedEnterpriseId}
        />
        <Input
          labelName="Redes Sociales"
          placeholder="@patagoniaadventures"
          type="text"
          onChange={handleChange}
          value={enterpriseForm.socialMedia}
          inputName="socialMedia"
          htmlFor="RedesSociales"
          disabled={!!selectedEnterpriseId}
        />

        <Textarea
          labelName="Descripción"
          placeholder="Empresa dedicada a organizar actividades de aventura en la Patagonia."
          onChange={handleChange}
          value={enterpriseForm.description}
          inputName="description"
          htmlFor="Descripcion"
          disabled={!!selectedEnterpriseId}
        />
      </div>
    </div>
  );
};
