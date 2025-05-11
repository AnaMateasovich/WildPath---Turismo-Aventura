import React from "react";
import styles from './Textarea.module.css'

export const Textarea = ({htmlFor, labelName, placeholder, value, inputName, onChange, disabled}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <textarea name={inputName} value={value} id="" onChange={onChange} placeholder={placeholder} disabled={disabled}></textarea>
    </div>
  );
};
