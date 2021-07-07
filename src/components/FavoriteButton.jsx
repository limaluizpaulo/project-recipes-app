import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  const { pathname } = useLocation();
  const { stateDrink, stateMeals } = useContext(RecipesContext);
  const [saveRecipe, setSaveRecipe] = useState('');
  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { idDrink, strDrink, strDrinkThumb, strCategory: drinkCategory,
    strAlcoholic } = stateDrink[0];
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = stateMeals[0];

  const saveStorage = () => {
    const type = pathname.includes('comida') ? 'comida' : 'bebida';
    if (stateChangeHeart) {
      if (type === 'comida') {
        setSaveRecipe({
          id: idMeal,
          name: strMeal,
          image: strMealThumb,
          category: strCategory,
          alcoholicOrNot: '',
          area: strArea,
          type,
        });
      } else {
        setSaveRecipe({
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          category: drinkCategory,
          alcoholicOrNot: strAlcoholic,
          type,
          area: '',
        });
      }
    }
  };
  const id = pathname.split('/')[2];
  const removeFavorited = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log('favorites', favorited);
    if (favorited !== null) {
      const filterLocalStorage = favorited.filter((element) => element.id !== id);
      console.log(filterLocalStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  const changeHeart = () => {
    setStateChangeHeart(!stateChangeHeart);
    if (stateChangeHeart) {
      removeFavorited();
    }
  };

  const verifyHeart = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favorited);
    if (favorited !== null) {
      const filterLocalStorage = favorited.some((element) => element.id !== idMeal);
      setStateChangeHeart(!filterLocalStorage);
    }
  };

  useEffect(verifyHeart, []);
  const setInlocalStorage = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (saveRecipe !== '' && favorited === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([saveRecipe]));
    } else if (saveRecipe !== '') {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorited, saveRecipe]));
    }
  };

  useEffect(setInlocalStorage, [saveRecipe]);
  return (
    <button type="button" onClick={ () => { saveStorage(); changeHeart(); } }>
      <img
        src={ stateChangeHeart ? whiteHeartIcon : blackHeartIcon }
        alt="imagem de favoritar"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavoriteButton;
