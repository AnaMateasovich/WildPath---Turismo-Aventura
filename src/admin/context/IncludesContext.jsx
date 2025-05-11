import { createContext, useContext, useState } from "react";

const IncludesContext = createContext();

export const IncludesProvider = ({ children }) => {
  const [includes, setIncludes] = useState([]);
  const [noIncludes, setNoIncludes] = useState([]);

  return (
    <IncludesContext.Provider
      value={{
        includes,
        setIncludes,
        noIncludes,
        setNoIncludes,
      }}
    >
      {children}
    </IncludesContext.Provider>
  );
};

export const useIncludes = () => useContext(IncludesContext)