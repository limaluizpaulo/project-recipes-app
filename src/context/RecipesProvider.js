import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import RandomRacipe from '../services/RandomRacipeAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState({ user: '', password: '' });
  const [recipeDetail, setRecipeDetail] = useState(false);
  const [goDetail, setGoDetail] = useState(false);

  const login = ({ inputedUser, password }) => {
    setUser({ user: inputedUser, password });
  };

  const getRandomRacipes = async (recipe) => {
    const { drinks } = await RandomRacipe(recipe);
    console.log('Surpreenda', drinks[0]);
    setRecipeDetail(drinks[0]);
    setGoDetail(true);
  };

  return (
    <RecipesContext.Provider
      value={ {
        user,
        login,
        getRandomRacipes,
        recipeDetail,
        goDetail,
      } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
