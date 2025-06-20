import { createContext, useContext, useState } from "react";
import { category } from "../../data/db";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState({
    package: [],
    category: [],
    place: [],
  });
  const [previews, setPreviews] = useState({
    package: [],
    category: [],
    place: [],
  });

  const clearImages = () => {
    setImages({
      package: [],
      category: [],
      place: [],
    });
    setPreviews({
      package: [],
      category: [],
      place: [],
    });
  };

  return (
    <ImagesContext.Provider
      value={{ images, setImages, previews, setPreviews, clearImages }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export const useImages = () => useContext(ImagesContext);
