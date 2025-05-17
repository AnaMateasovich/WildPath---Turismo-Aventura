import React from 'react'
import { Button } from '../../../components/Button/Button'
import styles from './Searchbar.module.css'

export const Searchbar = () => {
  return (
    <form className={styles.form}>
      <input type="text" placeholder='Buscar...' className={styles.searchInput}/>
      <Button text="Buscar" className={styles.btn} />
    </form>
  )
}
