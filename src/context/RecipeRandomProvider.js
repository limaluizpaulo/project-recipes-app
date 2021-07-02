import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeRandomContext } from '.';
import { randomRecipe } from '../service/api';

function RecipeRandomProvider({ children }) {
  const { pathname } = useLocation();
  const [randomId, setRandomId] = useState();

  useEffect(() => {
    const getRandomId = async () => {
      setRandomId(await randomRecipe(pathname));
    };
    getRandomId();
  }, []);

  return (
    <RecipeRandomContext.Provider value={ { randomId } }>
      {children}
    </RecipeRandomContext.Provider>
  );
}

RecipeRandomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeRandomProvider;
