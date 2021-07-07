import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = () => {
  const { pathname } = useLocation();
  const { stateDrink, stateMeals } = useContext(RecipesContext);
  const [saveRecipe, setSaveRecipe] = useState('');
  const [stateChangeHeart, setStateChangeHeart] = useState(false);
  const saveStorage = () => {
    const type = pathname.includes('comida') ? 'comida' : 'bebida';
    setSaveRecipe({ id: type === 'comida' ? stateMeals[0].idMeal : stateDrink[0].idDrink,
      name: type === 'comida' ? stateMeals[0].strMeal : stateDrink[0].strDrink,
      image: type === 'comida' ? stateMeals[0].strMealThumb : stateDrink[0].strDrinkThumb,
      category: type === 'comida' ? stateMeals[0].strCategory : stateDrink[0].strCategory,
      alcoholicOrNot: type === 'comida' ? '' : stateDrink[0].strAlcoholic,
      area: type === 'comida' ? stateMeals[0].strArea : '',
      type,
    });
  };
  const changeHeart = () => {
    setStateChangeHeart(!stateChangeHeart);
  };
  const setInlocalStorage = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (saveRecipe !== '' && favorited === null) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([saveRecipe]));
    } else if (saveRecipe !== '') {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favorited, saveRecipe]));
    }
  };
  useEffect(setInlocalStorage, [saveRecipe]);
  return (
    <button type="button" onClick={ () => { saveStorage(); changeHeart(); } }>
      <img
        src={ stateChangeHeart ? blackHeartIcon : whiteHeartIcon }
        alt="imagem de favoritar"
        data-testid="favorite-btn"
      />
    </button>
  );
};

export default FavoriteButton;
