import React from "react";
import styles from './Input.module.css'

export const Input = ({htmlFor, labelName, placeholder, type, value, inputName, onChange}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input id={htmlFor} type={type} placeholder={placeholder} value={value} name={inputName} onChange={onChange} 
     />
    </div>
  );
};
