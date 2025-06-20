import React from "react";
import styles from './ModalWindow.module.css'
import { Button } from "../../../components/Button/Button";

export const ModalWindow = ({ children, onCancel, onSave }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
        <div className={styles.buttonsEdit}>
          <Button text="Cancelar" onClick={onCancel} />
          <Button text="Guardar" onClick={onSave} />
        </div>
      </div>
    </div>
  );
};
