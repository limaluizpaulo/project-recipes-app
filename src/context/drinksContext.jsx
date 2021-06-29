import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

const DrinksContext = createContext();

export default function DrinksContextProvider({ children }) {
  // const [drinksFiltered, setDrinksFiltered] = useState([]);

  return (
    <DrinksContext.Provider
      value={ { drinksFiltered } }
    >
      {children}
    </DrinksContext.Provider>
  );
}

export function useDrinksContext() {
  const context = useContext(MealsContext);

  const { drinksFiltered } = context;
  return { drinksFiltered };
}

DrinksContextProvider.propTypes = {
  children: node.isRequired,
};
