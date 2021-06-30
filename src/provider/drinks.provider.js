import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from '../context/drinks.context';
import { fetchInit } from '../services';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

  const shared = {
    drinks,
    setDrinks,
  };

  async function getData() {
    const result = await fetchInit('drinks');
    setDrinks(result);
  }

  useEffect(() => {
    getData();
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
