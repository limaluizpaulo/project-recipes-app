import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from '../context/drinks.context';
import { fetchInit, fetchCategoriesDrinks } from '../services';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState();

  const shared = {
    drinks,
    setDrinks,
    filter,
    setFilter,
    category,
    setCategory,
  };

  async function getData() {
    const result = await fetchInit('drinks');
    setDrinks(result);
  }

  async function getCategories() {
    const MAX_ITEM = 5;
    const { drinks: listCategories } = await fetchCategoriesDrinks();
    const categories = listCategories.filter((item, index) => index < MAX_ITEM && item);
    setFilter(categories);
  }

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <DrinksContext.Provider value={ { ...shared } }>
      {children}
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
