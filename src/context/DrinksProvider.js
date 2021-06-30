import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState('All');

  return (
    <DrinksContext.Provider
      value={ {
        drinks,
        setDrinks,
        categories,
        setCategories,
        drinkCategory,
        setDrinkCategory,
      } }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
