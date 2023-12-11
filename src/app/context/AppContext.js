'use client';
import { useState, createContext, useMemo } from 'react';

const AppContext = createContext();

const ContextProvider = (props) => {

  const [links, setLinks] = useState([]);

  const value = useMemo(() => ({ links, setLinks }), [links, setLinks]);

  return <AppContext.Provider value={value} {...props} />;
};

export { AppContext, ContextProvider };