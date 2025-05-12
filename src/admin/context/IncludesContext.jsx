import { createContext, useContext, useState } from "react";

const IncludesContext = createContext();

export const IncludesProvider = ({ children }) => {
  const [packageIncludes, setPackageIncludes] = useState([]);
  const [noIncludes, setNoIncludes] = useState([]);

  return (
    <IncludesContext.Provider
      value={{
        packageIncludes,
        setPackageIncludes,
        // noIncludes,
        // setNoIncludes,
      }}
    >
      {children}
    </IncludesContext.Provider>
  );
};

export const useIncludes = () => useContext(IncludesContext)