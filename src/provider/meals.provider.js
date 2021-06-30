import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealsContext from '../context/meals.context';
import { fetchInit } from '../services';

function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);

  const shared = {
    meals,
    setMeals,
  };

  async function getData() {
    const result = await fetchInit('meals');
    setMeals(result);
  }

  useEffect(() => {
    getData();
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
