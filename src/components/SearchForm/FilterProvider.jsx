import React, { createContext, useContext, useState } from 'react'


const FilterContext = createContext();

export const FilterProvider = ({children}) => {

const [filter, setFilter] = useState(null)
const [page, setPage ] = useState(0)

  const ROUTE_IMAGE = "http://localhost:8081";

  const getImageUrl = (src) => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    return `${ROUTE_IMAGE}${src}`;
  };

  return (
     <FilterContext.Provider value={{ filter, setFilter, page, setPage, getImageUrl }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext);