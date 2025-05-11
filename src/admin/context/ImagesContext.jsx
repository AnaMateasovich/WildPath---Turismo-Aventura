import { createContext, useContext, useState } from "react";

const ImagesContext = createContext()

export const ImagesProvider = ({children}) => {

const [images, setImages] = useState([])
const [previews, setPreviews] = useState([]);

    return(
        <ImagesContext.Provider value={{images,setImages,previews, setPreviews}}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImages = () => useContext(ImagesContext)