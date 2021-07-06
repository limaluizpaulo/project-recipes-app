import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeDetailContext } from '.';
import {
  detailRecipeDrinks,
  detailRecipeMeal,
  recipesListRecomendationApi }
  from '../service/api';
import { detailProgressDrinks, detailProgressMeal } from '../service/InProgressApi';
import {
  inProgressLocalStorageDrinks,
  inProgressLocalStorageMeals }
  from '../helpFunctions/inProgressLocalStorage';

export default function RecipeDetailProvider({ children }) {
  const NUM_SIX = 6;

  const { pathname } = useLocation();
  const [idDetail, setIdDetail] = useState('');
  const [idProgress, setIdProgress] = useState('');
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [recipesRecomendation, setRecipesRecomendation] = useState([]);
  const [isRecomendation, setIsRecomendation] = useState(false);

  useEffect(() => {
    const requestDetail = async () => {
      if (pathname === `/bebidas/${idDetail}`) {
        const returnDetail = await detailRecipeDrinks(idDetail);
        // console.log(returnDetail);
        setRecipeDetail(returnDetail);
      }
      if (pathname === `/comidas/${idDetail}`) {
        const returnDetail = await detailRecipeMeal(idDetail);
        // console.log(returnDetail);
        setRecipeDetail(returnDetail);
      }
    };
    requestDetail();
  }, []);

  // Progress
  useEffect(() => {
    const requestDetailProgress = async () => {
      if (pathname === `/bebidas/${idProgress}/in-progress`) {
        const returnDetail = await detailProgressDrinks(idProgress);
        inProgressLocalStorageDrinks(returnDetail, idProgress);
        setRecipeInProgress(returnDetail);
      }
      if (pathname === `/comidas/${idProgress}/in-progress`) {
        const returnDetail = await detailProgressMeal(idProgress);
        inProgressLocalStorageMeals(returnDetail, idProgress);
        setRecipeInProgress(returnDetail);
      }
    };
    if (idProgress) {
      requestDetailProgress();
    }
  }, [idProgress]);

  // RECOMENDATIONS
  useEffect(() => {
    async function requestRecomendation() {
      const returnRecomendation = await recipesListRecomendationApi(pathname);
      const limitedCategories = returnRecomendation.slice(0, NUM_SIX);
      setRecipesRecomendation(limitedCategories);
    }
    if (isRecomendation) {
      requestRecomendation();
    }
  }, [isRecomendation]);

  return (
    <div>
      <RecipeDetailContext.Provider
        value={ {
          setIdDetail,
          setIdProgress,
          recipeDetail,
          recipeInProgress,
          setRecipeDetail,
          setIsRecomendation,
          recipesRecomendation,
        } }
      >
        { children }
      </RecipeDetailContext.Provider>
    </div>
  );
}

RecipeDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
