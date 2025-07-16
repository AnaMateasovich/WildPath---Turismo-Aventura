import React, { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import { DatesAvailable } from "../../components/DatesAvailable/DatesAvailable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageById } from "../../admin/redux/features/packages/packageThunk";
import { ReservationSummary } from "../../components/ReservationSummary/ReservationSummary";
import { Input } from "../../admin/components/Input/Input";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";
import { createBooking } from "../../admin/redux/features/booking/bookingThunk";
import { toast } from "react-toastify";


const Booking = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams();

  const selectedPackage = useSelector((state) => state.packages.selectedPackage);
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [userReserveInfo, setUserReserveInfo] = useState({
    address: "",
    zipcode: "",
    city: "",
    country: "",
    phoneNumber: ""
  });

  const totalPay = peopleCount * selectedPackage?.pricePerPerson

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserReserveInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  (selectedDay)
  const handleFinishReserve = async (e) => {
    e.preventDefault()
    if (!selectedDay) {
      window.alert("Debes seleccionar una fecha antes de reservar")
      return
    }
    if (!userReserveInfo.address || !userReserveInfo.zipcode || !userReserveInfo.city || !userReserveInfo.country || !userReserveInfo.phoneNumber) {
      window.alert("Por favor rellena todos los campos")
      setErrorMessage("Los campos con * son obligatorios")
      return
    }
    const confirm = window.confirm(`
      Por favor revise estos datos antes de realizar la reserva
      Paquete a reservar: ${selectedPackage.name}
      Cantidad de personas: ${peopleCount}
      Total a pagar: ${totalPay}
      `)
    if (confirm) {
      try {
        setIsLoading(true)

        await new Promise((res) => setTimeout(res, 1000));

        await dispatch(createBooking({
          packageId: Number(id),
          dateAvailableId: Number(selectedDay.id),
          quantityPeople: Number(peopleCount),
          userInfo: userReserveInfo
        })
        ).unwrap();

        setIsLoading(false);

        toast.success("¡Reserva realizada con éxito! Revisá tu correo para confirmar.", {
          autoClose: 7000,
        });
        navigate("/perfil/historial");
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocurrió un error al realizar la reserva. Intentá nuevamente.");
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (location.state) {
      if (location.state.selectedDay) {
        setSelectedDay(location.state.selectedDay)
      }
      if (location.state.peopleCount) {
        setPeopleCount(location.state.peopleCount)
      }
    }
    dispatch(fetchPackageById(id));
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  }, [dispatch, id, location.state]);

  if (!selectedPackage) {
    return <p className={styles.loading}>Cargando paquete...</p>;
  }


  return (
    <div className={styles.bookingContainer}>
      {isLoading && (
        <div className={styles.overlay}>
          <p className={styles.loadingBooking}>Procesando reserva...</p>
        </div>

      )}

      <section className={styles.packageInfo}>
        <h1 className={styles.title}>
          Reservá tu aventura: <span>{selectedPackage.name}</span>
        </h1>
        <p><strong>Ubicación: </strong> {selectedPackage.locationAddress}</p>
        <p>{selectedPackage.description}</p>
        <div className={styles.images}>

          {selectedPackage.images.slice(0, 5).map((img) => (
            <img src={`${API_URL}${img.src}`} alt="Imagen del paquete" className={styles.img} key={img.id} />
          ))}
        </div>
        <div>
          {selectedPackage.requirements.map((req) => (
            <p><strong>{req.title}:</strong> {req.description}</p>
          ))}
        </div>
        <p><strong>Política de cancelación: </strong>{selectedPackage.cancelPolicy}</p>

      </section>
      <div className={styles.sections}>
        <section className={styles.toReserveInfo}>
          <DatesAvailable
            datesAvailable={selectedPackage.datesAvailable}
            duration={selectedPackage.readableDuration}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
          />
        </section>
        <section className={styles.personalInfoForm}>
          <h3>Datos personales</h3>
          <Input
            htmlFor="name"
            labelName="Nombre"
            placeholder="Angélica"
            type="text"
            value={user.name}
            inputName="name"
            onChange=""
            id="name"
            readOnly
            reqField="*"
          />
          <Input
            htmlFor="lastname"
            labelName="Apellido"
            placeholder="Angélica Perez"
            type="text"
            value={user.lastname}
            inputName="lastname"
            onChange=""
            id="lastname"
            readOnly
            reqField="*"
          />
          <Input
            htmlFor="email"
            labelName="Email"
            placeholder="ejemplo@mail.com"
            type="email"
            value={user.email}
            inputName="email"
            onChange=""
            id="email"
            readOnly
            reqField="*"
          />
          <Input
            htmlFor="address"
            labelName="Dirección"
            type="text"
            value={userReserveInfo.address}
            inputName="address"
            onChange={handleChange}
            id="address"
            reqField="*"
          />
          <Input
            htmlFor="zipcode"
            labelName="Código Postal"
            type="text"
            value={userReserveInfo.zipcode}
            inputName="zipcode"
            onChange={handleChange}
            id="zipcode"
            reqField="*"
          />
          <Input
            htmlFor="city"
            labelName="Ciudad"
            type="text"
            value={userReserveInfo.city}
            inputName="city"
            onChange={handleChange}
            id="city"
            reqField="*"
          />
          <Input
            htmlFor="country"
            labelName="País / región"
            type="text"
            value={userReserveInfo.country}
            inputName="country"
            onChange={handleChange}
            id="country"
            reqField="*"
          />
          <Input
            htmlFor="phoneNumber"
            labelName="Teléfono móvil"
            type="text"
            value={userReserveInfo.phoneNumber}
            inputName="phoneNumber"
            onChange={handleChange}
            id="phoneNumber"
            reqField="*"
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </section>
        <section className={styles.finishReserve}>
          <ReservationSummary
            selectedDay={selectedDay}
            peopleCount={peopleCount}
            pricePerPerson={selectedPackage.pricePerPerson}
            productId={selectedPackage.id}
            onClickReserve={handleFinishReserve}
            classNameContainer={styles.reservationSummary}
          />
        </section>
      </div>
    </div>
  );
};

export default Booking;
