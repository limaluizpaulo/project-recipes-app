import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  const [mealsFiltered, setMealsFiltered] = useState([]);

  return (
    <MealsContext.Provider
      value={ { mealsFiltered, setMealsFiltered } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { mealsFiltered, setMealsFiltered } = context;

  return { mealsFiltered, setMealsFiltered };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
