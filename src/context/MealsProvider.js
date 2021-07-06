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

  const findMealRecipe = (id) => meals.find(({ idMeal }) => id === idMeal);

  const filterIngredients = (id) => {
    const newMeals = meals.find(({ idMeal }) => id === idMeal);
    const teste = Object.entries(newMeals);
    const teste2 = teste.filter((array) => array[0]
      .includes('strIngredient') && array[1] !== '');
    return teste2.map((array) => array[1]);
  };

  const context = {
    meals,
    setMeals,
    categories,
    setFilterCategory,
    setIngredientFilter,
    findMealRecipe,
    filterIngredients,
  };

  return (
    <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>
  );
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
