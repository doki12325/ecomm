"use client";

import { createContext, useContext, useState } from "react";

const DataContext = createContext();

function ContextProvider({ children }) {
  const [cart, setCart] = useState({
    cartData: [],
    shown: false,
    totalQuantity: 0,
  });
  return (
    <DataContext.Provider value={{ cart, setCart }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  const context = useContext(DataContext);
  return context;
};

export default ContextProvider;
