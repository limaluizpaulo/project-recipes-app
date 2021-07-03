import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';
import {
  fetchAllDrinks, fetchCategoriesDrinks,
  fetchDrinksByCategory, fetchDrinksByFirstLetter,
  fetchDrinksByIngredient, fetchDrinksByName, fetchDrinksById,
} from '../services/DrinksServices';

function DrinksProvider({ children }) {
  const [drinksFilter, setrinksFilter] = useState({ filteredDrinks: [] });
  const [allDrinks, setAllDrinks] = useState({ drinks: [] });
  const [allCategories, setAllCategories] = useState({ categories: [] });
  const [drinksFilteredByCategory,
    setDrinksFilteredByCategory] = useState({ drinksByCategory: [] });
  const [category, setCategory] = useState('All');
  const [isFiltred, setIsFiltred] = useState(false);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [ingredients, setIngredients] = useState([]);

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

  async function getDrinkById(id) {
    const SIZE = -1;
    const drink = await fetchDrinksById(id);
    setDrinkDetail(drink[0]);
    const keys = [];
    Object.keys(drinkDetail).forEach((key) => {
      if (key.indexOf('strIngredient') > SIZE && drinkDetail[key] !== null) {
        keys.push(drinkDetail[key]);
      }
    });
    setIngredients(keys);
    keys.slice(0, keys.length);
  }

  useEffect(() => {
    getAllDrinks();
    getAllCategories();
    filterDrinksByCategory(category);
  }, [category]);

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
        setDrinksFilteredByCategory,
        setCategory,
        category,
        isFiltred,
        setIsFiltred,
        drinkDetail,
        getDrinkById,
        ingredients,
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
