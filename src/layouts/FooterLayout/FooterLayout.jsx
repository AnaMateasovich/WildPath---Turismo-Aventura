import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './FooterLayout.module.css'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const FooterLayout = () => {
  return (
    <>
    <Outlet/>
    <footer className={styles.footer}>
        <div className={styles.logoCopy}>
            <p>©2025</p>
            <h2>WILDPATH</h2>
        </div>
        <div className={styles.text}>
            <p>¿Tienes un problema? <strong>Contáctanos</strong></p>
            <p>Preguntas Frecuentes</p>
        </div>
        <div className={styles.social}>
            <FacebookRoundedIcon style={{fontSize: "4rem"}}/>
            <InstagramIcon style={{fontSize: "4rem"}}/>
            <WhatsAppIcon style={{fontSize: "4rem"}}/>
        </div>
    </footer>
    </>
  )
}
