import React from "react";
import styles from "./ReviewAndSubmit.module.css";
import { useSelector } from "react-redux";
import { useIncludes } from "../../context/IncludesContext";
import { useImages } from "../../context/ImagesContext";
import { API_URL } from "../../redux/features/FullFormCreate/formSlice";

export const ReviewAndSubmit = () => {
  const enterprise = useSelector((state) => state.fullForm.enterpriseForm);
  const packageForm = useSelector((state) => state.fullForm.package);
  const datesAvailable = useSelector((state) => state.fullForm.datesAvailable);
  const requirements = useSelector((state) => state.fullForm.requirements);
  const { packageIncludes } = useIncludes();
  const { previews } = useImages();
(datesAvailable)

  return (
    <div className={styles.container}>
      {/* DATOS DE LA EMPRESA */}

      <div className={styles.section}>
        <h4 className={styles.titleSection}>Datos de la Enterprise</h4>

        <p>
          <strong>Nombre: </strong>
          {enterprise.name}
        </p>
        <p>
          <strong>Cuit: </strong>
          {enterprise.cuit}
        </p>
        <p>
          <strong>Email: </strong>
          {enterprise.email}
        </p>
        <p>
          <strong>Teléfono: </strong>
          {enterprise.phone}
        </p>
        <p>
          <strong>Dirección: </strong>
          {enterprise.address}
        </p>
        <p>
          <strong>Redes sociales: </strong>
          {enterprise.socialMedia}
        </p>
        <p>
          <strong>Descripción: </strong>
          {enterprise.description}
        </p>
      </div>

      {/* DATOS DEL PAQUETE */}
      <div className={styles.section}>
        <h4 className={styles.titleSection}>Datos del Paquete</h4>

        <p>
          <strong>Nombre: </strong>
          {packageForm.name}
        </p>
        <p>
          <strong>Categoría: </strong>
          {packageForm.category}
        </p>
        <p>
          <strong>Duración: </strong>
          {packageForm.duration.days !== 0 && packageForm.duration.nights !== 0 && packageForm.duration.days + " días / " } 
          {packageForm.duration.days !== 0 && packageForm.duration.nights === 0 && packageForm.duration.days + " días" } 
          {packageForm.duration.nigths !== 0 && packageForm.duration.nights + " noches"}
          {packageForm.duration.hours !== 0 && packageForm.duration.hours}
          {packageForm.duration.minutes !== 0 && packageForm.duration.minutes}
        </p>
        <p>
          <strong>Ubicaión: </strong>
          {packageForm.locationAddress}
        </p>
        <p>
          <strong>Precio por persona: </strong>
          {packageForm.pricePerPerson}
        </p>
        <p>
          <strong>Dificultad: </strong>
          {packageForm.difficulty}
        </p>
        <p>
          <strong>Descuento: </strong>
          {packageForm.discount}
        </p>
        <p>
          <strong>Politica de cancelación: </strong>
          {packageForm.cancelPolicy}
        </p>
        <p>
          <strong>Incluye: </strong>
        </p>
        <ul className={styles.listItems}>
          {packageIncludes.map((item, index) => (
            <div key={index}>
              <li>
                <img
                  src={item.preview}
                  alt="icono"
                  className={styles.imagePreviewList}
                  loading="lazy"
                />
                <p>{item.item}</p>
              </li>
            </div>
          ))}
        </ul>
        {/* <p>
          <strong>No incluye: </strong>
        </p>
        <ul className={styles.listItems}>
          {noIncludes.map((item, index) => (
            <div key={index}>
              <li>
                <img
                  src={item.icon}
                  alt="icono"
                  className={styles.imagePreviewList}
                />
                <p>{item.item}</p>
              </li>
            </div>
          ))}
        </ul> */}
        {/* <p>
          <strong>Itinerario: </strong>
        </p>
        {schedule.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Día</th>
                <th>Hoarario</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {packageForm.schedule.map((item, index) => (
                <tr key={index}>
                  <td className={styles.dayTable}>{item.day}</td>
                  <td className={styles.hourTable}>{item.hour}</td>
                  <td className={styles.descriptionTable}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody> */}
        {/* </table> */}
        {/* )} */}
      </div>

      {/* MULTIMEDIA */}
      <div className={styles.section}>
        <h4 className={styles.titleSection}>Multimedia</h4>
        {previews?.package?.length > 0 && (
          <ul className={styles.imgList}>
            {previews.package.map((image, index) => (
              <img
                key={index}
                src={`${image}`}
                alt={`image${index}`}
                className={styles.img}
                loading="lazy"
              />
            ))}
          </ul>
        )}
      </div>

      {/* FECHAS DISPONIBLES */}
      <div className={styles.section}>
        <h4 className={styles.titleSection}>Fechas Disponibles</h4>
        <table className={styles.dateTable}>
          <thead>
            <tr>
              <th>Fechas</th>
              <th className={styles.capacityTable}>Cupos</th>
            </tr>
          </thead>
          <tbody>
            {datesAvailable.map((item, index) => (
              <tr key={index}>
                <td className={styles.dateTable}>{item.date}</td>
                <td className={styles.capacityTable}>{item.spots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REQUERIMIENTOS Y RESTRICCIONES */}
      <div>
        <h4 className={styles.titleSection}>Requisitos / Restricciones</h4>
        <ul>
          {requirements.map((item, index) => (
            <li key={index}>
              <p>
                <strong>{item.title}:</strong> {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
