import React, { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import { fetchMealsByCategory, fetchMealsByName } from '../services/mealsApi';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  const [mealsFiltered, setMealsFiltered] = useState([]);
  const [filtersBtnsMeals, setFiltersBtnsMeals] = useState([]);
  const [valueMealsInput, serValueMealsInput] = useState('');
  const [filterMealsByIngre, setFilterMealsByIngre] = useState('');

  useEffect(() => {
    const NUM = 12;
    if (valueMealsInput) {
      fetchMealsByCategory(valueMealsInput)
        .then((res) => setMealsFiltered(res.slice(0, NUM)));
    }
    if (!valueMealsInput) {
      fetchMealsByName(valueMealsInput)
        .then((res) => setMealsFiltered(res.slice(0, NUM)));
    }
  }, [valueMealsInput]);

  return (
    <MealsContext.Provider
      value={ { mealsFiltered,
        setMealsFiltered,
        filtersBtnsMeals,
        setFiltersBtnsMeals,
        valueMealsInput,
        serValueMealsInput,
        filterMealsByIngre,
        setFilterMealsByIngre } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { mealsFiltered,
    setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals,
    valueMealsInput, serValueMealsInput, filterMealsByIngre,
    setFilterMealsByIngre } = context;
  return { mealsFiltered,
    setMealsFiltered,
    filtersBtnsMeals,
    setFiltersBtnsMeals,
    valueMealsInput,
    serValueMealsInput,
    filterMealsByIngre,
    setFilterMealsByIngre,
  };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
