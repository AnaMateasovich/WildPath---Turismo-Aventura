import React from 'react'
import styles from './Button.module.css'

export const Button = ({className, text, type, onClick, disabled, id}) => {
  return (
    <button onClick={onClick} id={id} className={`${styles.btn} ${className}`} type={type} disabled={disabled}>{text}</button>
  )
}
