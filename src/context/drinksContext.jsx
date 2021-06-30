import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const DrinksContext = createContext();

export default function DrinksContextProvider({ children }) {
  const [drinksFiltered, setDrinksFiltered] = useState([]);
  const [filtersBtnsDrinks, setFiltersBtnsDrinks] = useState([]);

  return (
    <DrinksContext.Provider
      value={ { drinksFiltered,
        setDrinksFiltered,
        filtersBtnsDrinks,
        setFiltersBtnsDrinks } }
    >
      {children}
    </DrinksContext.Provider>
  );
}

export function useDrinksContext() {
  const context = useContext(DrinksContext);

  const { drinksFiltered,
    setDrinksFiltered, filtersBtnsDrinks, setFiltersBtnsDrinks } = context;
  return { drinksFiltered, setDrinksFiltered, filtersBtnsDrinks, setFiltersBtnsDrinks };
}

DrinksContextProvider.propTypes = {
  children: node.isRequired,
};
