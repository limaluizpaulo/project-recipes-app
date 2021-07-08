import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MealsContext from '../context/meals.context';
import { fetchCategories } from '../services';

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
    const result = await fetchCategories('meals');

    const categoryNames = result
      .filter((item, index) => item && index < MAX_ITEMS)
      .map((item) => item.strCategory);

    setCategories(categoryNames);
  }

  useEffect(() => {
    getCategories();
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
