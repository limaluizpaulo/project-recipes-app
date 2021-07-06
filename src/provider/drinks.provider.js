import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from '../context/drinks.context';
import { fetchCategories } from '../services';

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
    const result = await fetchCategories('drinks');

    const categoryNames = result
      .filter((item, index) => item && index < MAX_ITEMS)
      .map((item) => item.strCategory);

    setCategories(categoryNames);
  }

  useEffect(() => {
    getCategories();
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
