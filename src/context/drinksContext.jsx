import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const DrinksContext = createContext();

export default function DrinksContextProvider({ children }) {
  const [drinksFiltered, setDrinksFiltered] = useState([]);

  return (
    <DrinksContext.Provider
      value={ { drinksFiltered, setDrinksFiltered } }
    >
      {children}
    </DrinksContext.Provider>
  );
}

export function useDrinksContext() {
  const context = useContext(DrinksContext);

  const { drinksFiltered, setDrinksFiltered } = context;
  return { drinksFiltered, setDrinksFiltered };
}

DrinksContextProvider.propTypes = {
  children: node.isRequired,
};
