import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export const makeRecipe = ({ url }, history) => {
  const mealOrDrink = url.split('/')[1];
  const id = url.split('/')[2];
  const mealCockTail = mealOrDrink === 'comidas' ? 'meals' : 'cocktails';
  const inProgressRecipes = {
    [mealCockTail]: {
      [id]: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  history.push(`/comidas/${id}/in-progress`);
};

export const localStorageVerifier = (match, id, history) => {
  const rawStorageRecipe = localStorage.getItem('inProgressRecipes');
  const storageRecipe = JSON.parse(rawStorageRecipe);
  let mealOrDrink;
  if (storageRecipe) {
    mealOrDrink = storageRecipe.meals ? storageRecipe.meals : storageRecipe.cocktails;
  }
  if ((!storageRecipe) || (storageRecipe
    && Object.keys(mealOrDrink)[0]
    !== id)) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => makeRecipe(match, history) }
      >
        Iniciar Receita
      </button>
    );
  }
  if (storageRecipe
    && Object.keys(mealOrDrink)[0] === id) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        Continuar Receita
      </button>
    );
  }
  const rawDoneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(rawDoneRecipes);
  if (doneRecipes && doneRecipes.find((recipe) => recipe.id === id)) {
    return null;
  }
};

export const verifyFavorite = (id) => {
  const rawFavorites = localStorage.getItem('favoriteRecipes');
  const favorites = JSON.parse(rawFavorites);
  if (favorites && favorites.find((fav) => fav.id === id)) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};
