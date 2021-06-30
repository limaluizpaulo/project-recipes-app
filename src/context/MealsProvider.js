import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/api/fetchRecipes';
import fetchCategories from '../services/api/fetchCategories';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadMeals = async () => {
      const a = await fetchRecipes('meals');
      const b = await fetchCategories('meals');
      setMeals(a);
      setCategories(b);
    };
    loadMeals();
  }, []);

  const setFilterCategory = async ({ target: { id } }) => {
    let filtered;
    if (selectedCategory === id) {
      filtered = await fetchRecipes('meals');
      setSelectedCategory('');
    } else {
      filtered = await fetchFilteredByCategory('meals', id);
      setSelectedCategory(id);
    }
    setMeals(filtered);
  };

  const context = {
    meals,
    categories,
    setFilterCategory,
  };

  return (
    <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>
  );
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
