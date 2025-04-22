import React from 'react'
import styles from './Button.module.css'

export const Button = ({className, text, type, onClick}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${className}`} type={type}>{text}</button>
  )
}
