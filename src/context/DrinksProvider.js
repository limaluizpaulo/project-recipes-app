import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';
import { fetchAllDrinks, fetchDrinksByFirstLetter,
  fetchDrinksByIngredient, fetchDrinksByName } from '../services/DrinksServices';

function DrinksProvider({ children }) {
  const [drinksFilter, setrinksFilter] = useState({ filteredDrinks: [] });
  const [allDrinks, setAllDrinks] = useState({ drinks: [] });

  async function filterDrinksByIngredient(ingredient) {
    const drinksFilteredByIngredient = await fetchDrinksByIngredient(ingredient);
    setrinksFilter({ filteredDrinks: drinksFilteredByIngredient });
  }

  async function filterDrinksByName(name) {
    const DrinksFilteredByName = await fetchDrinksByName(name);
    setrinksFilter({ filteredDrinks: DrinksFilteredByName });
  }

  async function filterDrinksByFirstLetter(firstLetter) {
    const drinksFilteredByFirstLetter = await fetchDrinksByFirstLetter(firstLetter);
    setrinksFilter({ filteredDrinks: drinksFilteredByFirstLetter });
  }

  async function getAllDrinks() {
    const drinks = await fetchAllDrinks();
    setAllDrinks({ drinks });
  }

  useEffect(() => {
    getAllDrinks();
  }, []);

  return (
    <DrinksContext.Provider
      value={ { drinksFilter,
        filterDrinksByIngredient,
        filterDrinksByName,
        filterDrinksByFirstLetter,
        allDrinks,
        getAllDrinks } }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
