import React, { useRef, useState } from "react";
import styles from "./InputAddList.module.css";
import { Button } from "../../../components/Button/Button";

export const InputAddList = ({
  titleSection,
  htmlFor,
  type,
  nameLabel,
  inputName,
  placeholder,
  note
}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItem] = useState([]);

  const inputRef = useRef(null)

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = [...items, inputValue];
    setItem(newItem);
    setInputValue("");
    inputRef.current.focus();
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const removeItem = items.filter((item, i) => {
      return i !== index;
    });
    setItem(removeItem);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor} className={styles.labelTitle}>
        {titleSection}
      </label>
      <div className={styles.formList}>
        <label htmlFor={htmlFor} className={styles.labelInput}>
          {nameLabel}
        </label>
        <input
        ref={inputRef}
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          name={inputName}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div>
          <Button text="Añadir" onClick={handleAdd} className={styles.btnAdd} />
        </div>
      </div>
      {items.length === 0 ? (
        <p className={styles.noteHelp}>{note}</p>
      ) : (
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              <li>{item}</li>
              <button
                className={styles.btnRemove}
                onClick={(e) => handleRemove(e, index)}
              >
                x
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
