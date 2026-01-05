import { createContext, useContext, useState } from "react";

// Create context
const FilterContext = createContext();

// Provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    region: "All",
    startDate: "",
    endDate: "",
    ageGroup: "All",
    gender: "All"
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook
export const useFilters = () => {
  return useContext(FilterContext);
};
