import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';
import { fetchDrinksByFirstLetter,
  fetchDrinksByIngredient, fetchDrinksByName } from '../services/DrinksServices';

function DrinksProvider({ children }) {
  const [drinksFilter, setDrinksFilter] = useState({ filteredDrinks: [] });

  async function filterDrinksByIngredient(ingredient) {
    const drinksFilteredByIngredient = await fetchDrinksByIngredient(ingredient);
    setDrinksFilter({ filteredDrinks: drinksFilteredByIngredient });
  }

  async function filterDrinksByName(name) {
    const DrinksFilteredByName = await fetchDrinksByName(name);
    setDrinksFilter({ filteredDrinks: DrinksFilteredByName });
  }

  async function filterDrinksByFirstLetter(firstLetter) {
    const drinksFilteredByFirstLetter = await fetchDrinksByFirstLetter(firstLetter);
    setDrinksFilter({ filteredDrinks: drinksFilteredByFirstLetter });
  }

  return (
    <DrinksContext.Provider
      value={ { drinksFilter,
        filterDrinksByIngredient,
        filterDrinksByName,
        filterDrinksByFirstLetter } }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
