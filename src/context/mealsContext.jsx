import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  const [mealsFiltered, setMealsFiltered] = useState([]);
  const [filtersBtnsMeals, setFiltersBtnsMeals] = useState([]);

  return (
    <MealsContext.Provider
      value={ { mealsFiltered, setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { mealsFiltered,
    setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals } = context;
  return { mealsFiltered, setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
