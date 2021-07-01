import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from '../context/drinks.context';
import { fetchByName, fetchCategories } from '../services';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const shared = {
    drinks,
    setDrinks,
    categories,
    setCategories,
  };

  async function getCategories() {
    const MAX_ITEMS = 5;
    const data = await fetchCategories('drinks');

    const categoryNames = data
      .filter((item, index) => item && index < MAX_ITEMS)
      .map((item) => item.strCategory);

    setCategories(categoryNames);
  }

  async function getDrinks() {
    const result = await fetchByName('drinks');
    setDrinks(result);
  }

  useEffect(() => {
    getCategories();
    getDrinks();
  }, []);

  return (
    <DrinksContext.Provider value={ { ...shared } }>
      {children}
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default DrinksProvider;
