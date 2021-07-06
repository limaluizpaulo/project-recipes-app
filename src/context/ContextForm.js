import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('Nome');
  const [firstMeals, setFirstMeals] = useState([]);
  const [firstDrinks, setFirstDrinks] = useState([]);

  const object = {
    email,
    setEmail,
    pass,
    setPass,
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
    firstMeals,
    setFirstMeals,
    firstDrinks,
    setFirstDrinks,
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const Favorite = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(Favorite));
    }
  }, []);

  return (
    <Context.Provider value={ object }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.Node,
}.isRequired;
