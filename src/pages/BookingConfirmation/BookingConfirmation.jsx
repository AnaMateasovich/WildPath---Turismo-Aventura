import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookingConfirmationToken } from '../../admin/redux/features/booking/bookingThunk'
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './BookingConfirmation.module.css'
import { Button } from '../../components/Button/Button';

const BookingConfirmation = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, confirmationMessage, error } = useSelector((state) => state.bookings)

    useEffect(() => {
        if (token) {
            dispatch(bookingConfirmationToken(token));
        }
    }, [token]);

    return (
        <div className={styles.container}>
            <div className={styles.message}>
                {loading && <p>Confirmando reserva...</p>}
                {confirmationMessage &&
                    <>
                        <h2>¡Felicidades tu reserva ya fue confirmada!</h2>
                        <p>Recuerda que tienes toda la información necesaria en el correo</p>
                        <p>Si tienes alguna duda, contactanos. <strong>wildpathturismo@gmail.com</strong></p>
                        <div className={styles.btnContainer}>
                            <Button text="Volver al inicio" onClick={() => navigate("/")} />
                        </div>
                    </>
                }
                {error &&
                    (
                        <div>
                            <h2>Lo sentimos, ocurrio un error al confirmar tu reserva.</h2>
                            <p>Contactanos y lo resolveremos <strong>wildpathturismo@gmail.com</strong></p>
                            <p>También puedes ponerte en contacto con la empresa que figura en tu correo.</p>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default BookingConfirmation