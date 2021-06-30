import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMeals from '../services/api/fetchMeals';
import fetchCategories from '../services/api/fetchCategories';

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadMeals = async () => {
      const a = await fetchMeals();
      const b = await fetchCategories('meals');
      setMeals(a);
      setCategories(b);
    };
    loadMeals();
  }, []);

  const context = { meals, setMeals, categories };

  return <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>;
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
