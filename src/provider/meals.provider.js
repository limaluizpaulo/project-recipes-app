import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MealsContext from '../context/meals.context';
import { fetchByName, fetchCategories } from '../services';

function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  const shared = {
    meals,
    setMeals,
    categories,
    setCategories,
  };

  async function getCategories() {
    const MAX_ITEMS = 5;
    const data = await fetchCategories('meals');

    const categoryNames = data
      .filter((item, index) => item && index < MAX_ITEMS)
      .map((item) => item.strCategory);

    setCategories(categoryNames);
  }

  async function getMeals() {
    const result = await fetchByName('meals');
    setMeals(result);
  }

  useEffect(() => {
    getCategories();
    getMeals();
  }, []);

  return (
    <MealsContext.Provider value={ { ...shared } }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MealsProvider;
