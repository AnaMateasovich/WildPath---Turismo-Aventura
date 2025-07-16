import React from "react";
import styles from './Input.module.css'

export const Input = ({ htmlFor, labelName, placeholder, type, value, inputName, onChange, disabled, id, defaultValue, readOnly, reqField }) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelDiv}>
        <label htmlFor={htmlFor}>{labelName}</label>
        <p>{reqField}</p>
      </div>
      <input id={id} type={type} placeholder={placeholder} value={value ?? ""} name={inputName} onChange={onChange} disabled={disabled} className={styles.input} defaultValue={defaultValue} readOnly={readOnly}
      />
    </div>
  );
};
