import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);

  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const context = {
    openSearchBar,
    handleSearchBar,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
