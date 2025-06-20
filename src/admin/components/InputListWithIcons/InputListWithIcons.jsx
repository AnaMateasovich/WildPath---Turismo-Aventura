import React, { useEffect, useRef, useState } from "react";
import styles from "./InputListWithIcons.module.css";
import { Button } from "../../../components/Button/Button";
import { API_URL } from "../../redux/features/FullFormCreate/formSlice";

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
  id,
  itemsState = [],
  isEditing = false,
}) => {
  const MAX_FILE_SIZE = 4 * 1024;

  const [newItem, setNewItem] = useState({
    [`${inputName}-item`]: "",
    [`${inputName}-icon`]: null,
    [`${inputName}-preview`]: null,
  });
  const [editingItem, setEditingItem] = useState({
    [`${inputName}-id`]: "",
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
      if (isEditing) {
        setEditingItem((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setNewItem((prev) => ({
          ...prev,
          [name]: value, 
        }));
      }
    }
  };

  const handleIconChange = (file) => {
    const originalFile = file;
    if (file.size > MAX_FILE_SIZE) {
      alert("El icono no debe superar los 4KB");
      return;
    }

    const reader = new FileReader();
    if (isEditing) {
      reader.onloadend = () => {
        setEditingItem((prev) => ({
          ...prev,
          [`${inputName}-icon`]: originalFile, // Guarda el archivo original
          [`${inputName}-preview`]: reader.result, // Guarda la vista previa en base64
        }));
      };
    } else {
      reader.onloadend = () => {
        setNewItem((prev) => ({
          ...prev,
          [`${inputName}-icon`]: originalFile, // Guarda el archivo original
          [`${inputName}-preview`]: reader.result, // Guarda la vista previa en base64
        }));
      };
    }

    reader.readAsDataURL(file);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isEditing) {
      const itemValue = newItem[`${inputName}-item`];
      const iconValue = newItem[`${inputName}-icon`];
      const previewValue = newItem[`${inputName}-preview`];

      const cleanItem = {
        item: itemValue,
        icon: iconValue,
        preview: previewValue,
      };

      if (onAddItem) onAddItem(cleanItem);

      setNewItem({
        [`${inputName}-item`]: "",
        [`${inputName}-icon`]: null,
        [`${inputName}-preview`]: null,
      });

      inputRef.current.focus();
    } else {
      const id = editingItem[`${inputName}-id`];
      const itemValue = editingItem[`${inputName}-item`];
      const iconValue = editingItem[`${inputName}-icon`];
      const previewValue = editingItem[`${inputName}-preview`]|| editingItem[`${inputName}-icon`];

      const cleanItem = {
        id: id,
        item: itemValue,
        icon: iconValue,
        preview: previewValue,
      };

      if (onAddItem) onAddItem(cleanItem);
      setEditingItem({
        [`${inputName}-item`]: "",
        [`${inputName}-icon`]: null,
        [`${inputName}-preview`]: null,
      });
    }
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    if (onRemoveItem) onRemoveItem(index);
  };

  useEffect(() => {
    if (isEditing) {
      setEditingItem({
        [`${inputName}-id`]: isEditing.id,
        [`${inputName}-item`]: isEditing.description,
        [`${inputName}-icon`]: isEditing.iconSrc,
        [`${inputName}-preview`]: isEditing.iconSrc,
      });
    } else {
      setNewItem({
        [`${inputName}-item`]: "",
        [`${inputName}-icon`]: null,
        [`${inputName}-preview`]: null,
      });
    }
  }, [isEditing]);


  return (
    <div className={styles.containerInputWithIcons}>
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
            id={id}
            type={type}
            placeholder={placeholder}
            value={
              isEditing
                ? editingItem[`${inputName}-item`]
                : newItem[`${inputName}-item`] || ""
            }
            name={`${inputName}-item`}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor={`icon-${htmlFor}`} className={styles.labelInput}>
            Icon
          </label>
          <input
            id={`icon-${id}`}
            type="file"
            name={`${inputName}-icon`}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btnAddContainer}>
          <Button
            text={isEditing ? "Actualizar" : "Añadir"}
            onClick={handleAdd}
            id={`button-${inputName}`}
            className={styles.btnAdd}
          />
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
                  src={item.preview?.startsWith("data:") ? item.preview : `${API_URL}${item.preview}`}
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
