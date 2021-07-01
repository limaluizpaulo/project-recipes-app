import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { endPoint } from '../utils';

export const GlobalContext = createContext();

const Provider = ({ children }) => {
  const [searchOp, setSearchOp] = useState({});
  const [recipes, setRecipes] = useState({});

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
  };

  return <GlobalContext.Provider value={ value }>{children}</GlobalContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
