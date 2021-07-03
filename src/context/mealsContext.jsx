import React, { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import { fetchMealsByCategory,
  fetchMealsByName, fetchMealsByIngre } from '../services/mealsApi';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  const [mealsFiltered, setMealsFiltered] = useState([]);
  const [filtersBtnsMeals, setFiltersBtnsMeals] = useState([]);
  const [valueMealsInput, serValueMealsInput] = useState('');
  const [valueMealsInputByIngre, setValueMealInputByIngre] = useState('');
  const [areaSelected, setAreaSelected] = useState('American');

  useEffect(() => {
    const NUM = 12;
    if (valueMealsInput) {
      fetchMealsByCategory(valueMealsInput)
        .then((res) => setMealsFiltered(res.slice(0, NUM)));
    }
    if (!valueMealsInput && !valueMealsInputByIngre) {
      fetchMealsByName(valueMealsInput)
        .then((res) => setMealsFiltered(res.slice(0, NUM)));
    }

    if (valueMealsInputByIngre) {
      fetchMealsByIngre(valueMealsInputByIngre)
        .then((data) => setMealsFiltered(data.slice(0, NUM)));
    }
  }, [valueMealsInput, valueMealsInputByIngre]);

  return (
    <MealsContext.Provider
      value={ { mealsFiltered,
        setMealsFiltered,
        filtersBtnsMeals,
        setFiltersBtnsMeals,
        valueMealsInput,
        serValueMealsInput,
        areaSelected,
        setAreaSelected,
        valueMealsInputByIngre,
        setValueMealInputByIngre } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { mealsFiltered,
    setMealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals,
    valueMealsInput, serValueMealsInput, areaSelected, setAreaSelected,
    valueMealsInputByIngre, setValueMealInputByIngre } = context;
  return { mealsFiltered,
    setMealsFiltered,
    filtersBtnsMeals,
    setFiltersBtnsMeals,
    valueMealsInput,
    serValueMealsInput,
    areaSelected,
    setAreaSelected,
    valueMealsInputByIngre,
    setValueMealInputByIngre,
  };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
