import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <DrinksContext.Provider
      value={ { drinks,
        setDrinks,
        categories,
        setCategories,
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
