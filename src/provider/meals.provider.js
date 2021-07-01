import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealsContext from '../context/meals.context';
import { fetchInit, fetchCategoriesMeals } from '../services';

function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState('');

  const shared = {
    meals,
    setMeals,
    filter,
    setFilter,
    category,
    setCategory,
  };

  async function getData() {
    const result = await fetchInit('meals');
    setMeals(result);
  }

  async function getCategories() {
    const MAX_ITEM = 5;
    const { meals: listCategories } = await fetchCategoriesMeals();
    const categories = listCategories.filter((meal, index) => index < MAX_ITEM && meal);
    setFilter(categories);
  }

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <MealsContext.Provider value={ { ...shared } }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
