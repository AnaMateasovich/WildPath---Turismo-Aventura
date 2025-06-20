import React from "react";
import styles from './Input.module.css'

export const Input = ({htmlFor, labelName, placeholder, type, value, inputName, onChange,disabled, id}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} name={inputName} onChange={onChange} disabled={disabled} className={styles.input}
     />
    </div>
  ); 
};
