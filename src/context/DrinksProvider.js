import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';
import {
  fetchAllDrinks, fetchCategoriesDrinks,
  fetchDrinksByCategory, fetchDrinksByFirstLetter,
  fetchDrinksByIngredient, fetchDrinksByName,
} from '../services/DrinksServices';

function DrinksProvider({ children }) {
  const [drinksFilter, setrinksFilter] = useState({ filteredDrinks: [] });
  const [allDrinks, setAllDrinks] = useState({ drinks: [] });
  const [allCategories, setAllCategories] = useState({ categories: [] });
  const [drinksFilteredByCategory,
    setDrinksFilteredByCategory] = useState({ drinksByCategory: [] });
  const [category, setCategory] = useState('All');
  const [isFiltred, setIsFiltred] = useState(false);

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

  async function getAllCategories() {
    const categories = await fetchCategoriesDrinks();
    setAllCategories({ categories });
  }

  async function filterDrinksByCategory(categoryItem) {
    const drinksByCategory = await fetchDrinksByCategory(categoryItem);
    setDrinksFilteredByCategory({ drinksByCategory });
  }

  useEffect(() => {
    getAllDrinks();
    getAllCategories();
    if (category === 'All') {
      setDrinksFilteredByCategory(allDrinks);
    }
    filterDrinksByCategory(category);
  }, [allDrinks, category]);

  return (
    <DrinksContext.Provider
      value={ { drinksFilter,
        filterDrinksByIngredient,
        filterDrinksByName,
        filterDrinksByFirstLetter,
        allDrinks,
        allCategories,
        filterDrinksByCategory,
        drinksFilteredByCategory,
        setCategory,
        category,
        isFiltred,
        setIsFiltred,
      } }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
