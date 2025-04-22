import React from 'react'
import styles from './Select.module.css'
export const Select = ({labelName, options}) => {
  return (
    <div className={styles.container}>
        <label htmlFor="">{labelName}</label>
        <select name="" id="">
            <option selected disabled>--- Seleccione ---</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
  )
}
