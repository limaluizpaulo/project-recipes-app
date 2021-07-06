import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/api/fetchRecipes';
import fetchCategories from '../services/api/fetchCategories';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ingredientFilter, setIngredientFilter] = useState('');

  useEffect(() => {
    const loadMeals = async () => {
      const a = await fetchRecipes('meals', ingredientFilter);
      const b = await fetchCategories('meals');
      setMeals(a);
      setCategories(b);
    };
    loadMeals();
  }, [ingredientFilter]);

  const setFilterCategory = async ({ target: { id } }) => {
    let filtered;

    if (selectedCategory === id || id === 'All') {
      filtered = await fetchRecipes('meals');
      setSelectedCategory('All');
    } else {
      filtered = await fetchFilteredByCategory('meals', id);
      setSelectedCategory(id);
    }
    setMeals(filtered);
  };

  const context = {
    meals,
    setMeals,
    categories,
    setFilterCategory,
    setIngredientFilter,
  };

  return (
    <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>
  );
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
