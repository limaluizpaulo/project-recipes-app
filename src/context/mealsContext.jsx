import React, { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import { fetchMealsByCategory, fetchMealsByName } from '../services/mealsApi';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  const [mealsFiltered, setMealsFiltered] = useState([]);
  const [filtersBtnsMeals, setFiltersBtnsMeals] = useState([]);
  const [valueMealsInput, serValueMealsInput] = useState('');
  const [areaSelected, setAreaSelected] = useState('American');

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
        areaSelected,
        setAreaSelected } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { mealsFiltered,
    setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals,
    valueMealsInput, serValueMealsInput, areaSelected, setAreaSelected } = context;
  return { mealsFiltered,
    setMealsFiltered,
    filtersBtnsMeals,
    setFiltersBtnsMeals,
    valueMealsInput,
    serValueMealsInput,
    areaSelected,
    setAreaSelected,
  };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
