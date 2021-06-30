import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import RandomRacipe from '../services/RandomRacipeAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState({ user: '', password: '' });
  const [recipeDetail, setRecipeDetail] = useState(false);
  const [goDetail, setGoDetail] = useState(false);

  const login = ({ email, password }) => {
    setUser({ user: email, password });
  };

  const getRandomRacipes = async (recipe) => {
    const result = await RandomRacipe(recipe);
    // console.log(result);
    console.log('Surpreenda', result[recipe][0]);
    setRecipeDetail(result[recipe][0]);
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
        setGoDetail,
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
