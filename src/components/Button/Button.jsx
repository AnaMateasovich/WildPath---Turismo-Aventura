import React from 'react'
import styles from './Button.module.css'

export const Button = ({className, text, type}) => {
  return (
    <button className={`${styles.btn} ${className}`} type={type}>{text}</button>
  )
}
