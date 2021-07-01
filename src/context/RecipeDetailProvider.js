import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeDetailContext } from '.';
import { detailRecipe } from '../service/api';

export default function RecipeDetailProvider({ children }) {
  const { pathname } = useLocation();
  const [idDetail, setIdDetail] = useState('');
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const requestDetail = async () => {
      const returnDetail = await detailRecipe(idDetail, pathname);
      setRecipeDetail(returnDetail);
    };
    requestDetail();
  }, [idDetail]);

  return (
    <div>
      <RecipeDetailContext.Provider value={ { setIdDetail, recipeDetail, setRecipeDetail, setIngredients } }>
        { children }
      </RecipeDetailContext.Provider>
    </div>
  );
}

RecipeDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
