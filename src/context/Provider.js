import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { endPoint } from '../utils';
import requests from '../services/requests';

export const GlobalContext = createContext();

const Provider = ({ children }) => {
  const [searchOp, setSearchOp] = useState({});
  const [recipes, setRecipes] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ctgMeals, setCtgMeals] = useState([]);
  const [ctgDrinks, setCtgDrinks] = useState([]);

  useEffect(() => {
    (async () => {
      const { meals: m, drinks: d, ctgMeals: cm, ctgDrinks: cd } = await requests();
      setMeals(m.meals);
      setDrinks(d.drinks);
      setCtgMeals(cm.meals);
      setCtgDrinks(cd.drinks);
    })();
  }, []);

  useEffect(() => {
    const URL = endPoint(searchOp);
    if (URL) {
      fetch(URL)
        .then((res) => res.json())
        .then(setRecipes);
    }
  }, [searchOp]);

  const value = {
    setSearchOp,
    recipes,
    meals,
    drinks,
    ctgMeals,
    ctgDrinks,
  };

  return <GlobalContext.Provider value={ value }>{children}</GlobalContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
