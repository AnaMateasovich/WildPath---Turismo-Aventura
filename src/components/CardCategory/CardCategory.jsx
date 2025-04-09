import React from 'react'
import styles from './CardCategory.module.css'

export const CardCategory = ({name, description, img, alt}) => {
  return (
    <div className={styles.container}>
        <img src={img} alt={alt} className={styles.img}/>
        <h3 className={styles.title}>{name}</h3>
        <p>{description}</p>
    </div>
  )
}
