import React from "react";
import styles from './Textarea.module.css'

export const Textarea = ({htmlFor, labelName, placeholder, type, value, inputName, onChange}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <textarea name={inputName} value={value} id="" onChange={onChange} placeholder={placeholder}></textarea>
    </div>
  );
};
