'use client';
import { useState, createContext, useMemo } from 'react';

const AppContext = createContext();

const ContextProvider = (props) => {
  const [links, setLinks] = useState([]);
  const [welcome, setWelcome] = useState(true);

  const value = useMemo(
    () => ({ links, setLinks, welcome, setWelcome }),
    [links, setLinks, welcome, setWelcome]
  );

  return <AppContext.Provider value={value} {...props} />;
};

export { AppContext, ContextProvider };
