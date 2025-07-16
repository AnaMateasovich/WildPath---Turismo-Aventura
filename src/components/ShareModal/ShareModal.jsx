import React, { useState } from "react";
import styles from "./ShareModal.module.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { API_URL } from "../../admin/redux/features/FullFormCreate/formSlice";

export const ShareModal = ({ name, description, image, setToShare, link }) => {
  const [message, setMessage] = useState("");

  const fullMessage = message ? `${message} ${link}` : link;

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    fullMessage
  )}`;

  return (
    <div className={styles.overlayShare}>
      <div className={styles.shareContainer}>
        <button
          className={styles.closeBtn}
          aria-label="Cerrar ventana de compartir"
          onClick={() => setToShare(false)}
        >
          <CloseRoundedIcon style={{ fontSize: "3rem" }} />
        </button>
        <div className={styles.shareInfoContainer}>
          <h4 className={styles.shareTitle}>Compartir vínculo</h4>
          <div className={styles.shareInfoContainerPackage}>
            <img
              src={`${API_URL}${image}`}
              alt="Imagen del paquete"
              className={styles.shareImg}
              loading="lazy"
            />
            <div className={styles.shareInfoContainerPackageText}>
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.linkBox}>
            <input
              type="text"
              value={link}
              readOnly
              className={styles.linkInput}
              onClick={(e) => e.target.select()}
            />
            <button
              className={styles.copyBtn}
              onClick={() => {
                navigator.clipboard.writeText(link);
                alert("Enlace copiado al portapapeles.");
              }}
            >
              Copiar
            </button>
          </div>
          <textarea
            name="message"
            id="message"
            value={message}
            placeholder="Escribe algo..."
            className={styles.inputTextToShare}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <p></p>
          <ul>
            <li>
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon style={{ fontSize: "4rem" }} />
              </a>
            </li>
            <li>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ fontSize: "4rem" }} />
              </a>
            </li>
            <li>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <XIcon style={{ fontSize: "4rem" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
