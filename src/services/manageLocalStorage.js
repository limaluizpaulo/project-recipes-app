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

export const settingFavorite = (details, id, refresh) => {
  const favoritesArrayVerifier = localStorage.getItem('favoriteRecipes');
  if (!favoritesArrayVerifier) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const rawFavoritesArray = localStorage.getItem('favoriteRecipes');
  const favoritesArray = JSON.parse(rawFavoritesArray);
  let favoriteObject = {};
  if (details.meals) {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = details.meals[0];
    favoriteObject = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
  }
  if (details.drinks) {

  }

  if (!favoritesArray.find((obj) => obj.id === id)) {
    favoritesArray.push(favoriteObject);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesArray));
  } else {
    const RemovedFavoriteArray = favoritesArray.filter((obj) => obj.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(RemovedFavoriteArray));
  }
  return !refresh;
};
