import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/api/fetchRecipes';
import fetchCategories from '../services/api/fetchCategories';
import fetchById from '../services/api/fetchById';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ingredientFilter, setIngredientFilter] = useState('');

  useEffect(() => {
    const loadDrinks = async () => {
      const a = await fetchRecipes('drinks', ingredientFilter);
      const b = await fetchCategories('drinks');
      setDrinks(a);
      setCategories(b);
    };
    loadDrinks();
  }, [ingredientFilter]);

  const setFilterCategory = async ({ target: { id } }) => {
    let filtered;
    if (selectedCategory === id || id === 'All') {
      filtered = await fetchRecipes('drinks');
      setSelectedCategory('');
    } else {
      filtered = await fetchFilteredByCategory('drinks', id);
      setSelectedCategory(id);
    }
    setDrinks(filtered);
  };

  const filterById = async (type, id) => {
    const response = await fetchById(type, id);
    return response;
  };

  const filterIngredients = async (type, id) => {
    const filterRecipe = await fetchById(type, id);
    const arrayDrink = Object.entries(filterRecipe);

    const filterDrink = arrayDrink.filter((array) => array[0]
      .includes('strIngredient') && array[1] !== null);
    const result = filterDrink.map((array) => array[1]);
    return result;
  };

  const filterAllMeasure = async (type, id) => {
    const filterRecipe = await fetchById(type, id);
    const arrayDrink = Object.entries(filterRecipe);
    const filterMeasure = arrayDrink.filter((array) => array[0]
      .includes('strMeasure') && array[1] !== null);
    const result = filterMeasure.map((array) => array[1]);
    return result;
  };

  const context = { drinks,
    setDrinks,
    categories,
    setFilterCategory,
    filterById,
    filterIngredients,
    filterAllMeasure,
    setIngredientFilter };
  return (
    <DrinksContext.Provider value={ context }>
      { children }
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DrinksContext, DrinksProvider };
