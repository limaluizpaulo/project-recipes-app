import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMeals from '../services/api/fetchMeals';

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const loadMeals = async () => {
      const a = await fetchMeals();
      setMeals(a);
    };
    loadMeals();
  }, []);

  const context = { meals };

  return <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>;
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
