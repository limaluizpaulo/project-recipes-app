import React, { createContext, useContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import { fetchDrinksByCategory,
  fetchDrinkByName, fetchDrinkByIngre } from '../services/drinksApi';

const DrinksContext = createContext();

export default function DrinksContextProvider({ children }) {
  const [drinksFiltered, setDrinksFiltered] = useState([]);
  const [filtersBtnsDrinks, setFiltersBtnsDrinks] = useState([]);
  const [valueDrinksInput, serValueDrinksInput] = useState('');
  const [valueDrinksInputByIngre, setValueDrinksInputByIngre] = useState('');
  const [filterDrinksByIngre, setFilterDrinksByIngre] = useState('');

  useEffect(() => {
    const NUM = 12;
    if (valueDrinksInput) {
      fetchDrinksByCategory(valueDrinksInput)
        .then((res) => setDrinksFiltered(res.slice(0, NUM)));
    }
    if (!valueDrinksInput && !valueDrinksInputByIngre) {
      fetchDrinkByName(valueDrinksInput)
        .then((res) => setDrinksFiltered(res.slice(0, NUM)));
    }

    if (valueDrinksInputByIngre) {
      fetchDrinkByIngre(valueDrinksInputByIngre)
        .then((data) => setDrinksFiltered(data.slice(0, NUM)));
    }
  }, [valueDrinksInput, valueDrinksInputByIngre]);

  return (
    <DrinksContext.Provider
      value={ { drinksFiltered,
        setDrinksFiltered,
        filtersBtnsDrinks,
        setFiltersBtnsDrinks,
        valueDrinksInput,
        serValueDrinksInput,
        filterDrinksByIngre,
        setFilterDrinksByIngre,
        valueDrinksInputByIngre,
        setValueDrinksInputByIngre } }
    >
      {children}
    </DrinksContext.Provider>
  );
}

export function useDrinksContext() {
  const context = useContext(DrinksContext);

  const { drinksFiltered,
    setDrinksFiltered, filtersBtnsDrinks, setFiltersBtnsDrinks,
    valueDrinksInput, serValueDrinksInput, filterDrinksByIngre,
    setFilterDrinksByIngre, valueDrinksInputByIngre,
    setValueDrinksInputByIngre } = context;
  return { drinksFiltered,
    setDrinksFiltered,
    filtersBtnsDrinks,
    setFiltersBtnsDrinks,
    valueDrinksInput,
    serValueDrinksInput,
    filterDrinksByIngre,
    setFilterDrinksByIngre,
    valueDrinksInputByIngre,
    setValueDrinksInputByIngre };
}

DrinksContextProvider.propTypes = {
  children: node.isRequired,
};
