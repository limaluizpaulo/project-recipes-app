import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/api/fetchRecipes';
import fetchCategories from '../services/api/fetchCategories';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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

  const context = { drinks,
    setDrinks,
    categories,
    setFilterCategory,
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
