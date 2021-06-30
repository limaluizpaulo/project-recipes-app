import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchDrinks from '../services/api/fetchDrinks';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      const a = await fetchDrinks();
      setDrinks(a);
    };
    loadDrinks();
  }, []);

  const context = { drinks };
  return (
    <DrinksContext.Provider value={ context }>
      { children }
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DrinksContext, DrinksProvider };
