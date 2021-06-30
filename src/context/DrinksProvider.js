import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchDrinks from '../services/api/fetchDrinks';
import fetchCategories from '../services/api/fetchCategories.jsx';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      const a = await fetchDrinks();
      const b = await fetchCategories('drinks');
      setDrinks(a);
      setCategories(b);
    };
    loadDrinks();
  }, []);

  const context = { drinks, categories };
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
