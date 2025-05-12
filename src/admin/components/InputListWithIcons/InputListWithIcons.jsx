import React, { useEffect, useRef, useState } from "react";
import styles from "./InputListWithIcons.module.css";
import { Button } from "../../../components/Button/Button";

export const InputListWithIcons = ({
  titleSection,
  htmlFor,
  type,
  nameLabel,
  inputName,
  placeholder,
  note,
  onAddItem,
  onRemoveItem,
  itemsState = [],
}) => {
  const MAX_FILE_SIZE = 4 * 1024;

  const [newItem, setNewItem] = useState({
    [`${inputName}-item`]: "",
    [`${inputName}-icon`]: null,
    [`${inputName}-preview`]: null,
  });
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) handleIconChange(file, name);
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: value, // actualiza el campo de texto normalmente
      }));
    }
  };

  const handleIconChange = (file) => {
    const originalFile = file;
    if (file.size > MAX_FILE_SIZE) {
      alert("El icono no debe superar los 4KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItem((prev) => ({
        ...prev,
        [`${inputName}-icon`]: originalFile, // Guarda el archivo original
        [`${inputName}-preview`]: reader.result, // Guarda la vista previa en base64
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const itemValue = newItem[`${inputName}-item`];
    const iconValue = newItem[`${inputName}-icon`];
    const previewValue = newItem[`${inputName}-preview`];

    const cleanItem = {
      item: itemValue,
      icon: iconValue,
      preview: previewValue
    };

    if (onAddItem) onAddItem(cleanItem);

    setNewItem({
      [`${inputName}-item`]: "",
      [`${inputName}-icon`]: null,
      [`${inputName}-preview`]: null,
    });

    inputRef.current.focus();
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    if (onRemoveItem) onRemoveItem(index);
  };

  return (
    <div className={styles.container}>
      <p htmlFor={htmlFor} className={styles.labelTitle}>
        {titleSection}
      </p>
      <div className={styles.form}>
        <div>
          <label htmlFor={htmlFor} className={styles.labelInput}>
            {nameLabel}
          </label>
          <input
            ref={inputRef}
            id={htmlFor}
            type={type}
            placeholder={placeholder}
            value={newItem[`${inputName}-item` || ""]}
            name={`${inputName}-item`}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor={`icon-${htmlFor}`} className={styles.labelInput}>
            Icon
          </label>
          <input
            id={`icon-${htmlFor}`}
            type="file"
            name={`${inputName}-icon`}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btnAddContainer}>
          <Button text="Añadir" onClick={handleAdd} className={styles.btnAdd} />
        </div>
      </div>
      {itemsState.length === 0 ? (
        <p className={styles.noteHelp}>{note}</p>
      ) : (
        <ul className={styles.listItems}>
          <h4 className={styles.listTitle}>Lista de {`${titleSection}`}</h4>
          {itemsState.map((item, index) => (
            <div key={index}>
              <li>
                <img
                  src={item.preview}
                  alt="icono"
                  className={styles.imagePreview}
                />
                <p>{item.item}</p>
                <button
                  onClick={(e) => handleRemove(e, index)}
                  className={styles.btnRemove}
                >
                  x
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
