import React from 'react'
import styles from './Select.module.css'
export const Select = ({labelName, options,selectName,htmlFor,value, onChange}) => {
  return (
    <div className={styles.container}>
        <label htmlFor={htmlFor}>{labelName}</label>
        <select name={selectName} id={htmlFor} value={value} onChange={onChange}>
            <option value="" disabled>--- Seleccione ---</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
  )
}
