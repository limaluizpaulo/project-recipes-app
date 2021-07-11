import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from '../Context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { pathname } = useLocation();
  const { stateDrink, stateMeals } = useContext(RecipesContext);
  const [saveRecipe, setSaveRecipe] = useState('');
  // const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { idDrink, strDrink, strDrinkThumb, strCategory: drinkCategory,
    strAlcoholic } = stateDrink[0];
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = stateMeals[0];

  const { stateChangeHeart, setStateChangeHeart, removeFavorited, index } = props;

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

  // const removeFavorited = () => {
  //   const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favorited) {
  //     const filterLocalStorage = favorited.filter((element) => element.id !== id);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
  //   }
  // };

  const changeHeart = () => {
    setStateChangeHeart(!stateChangeHeart);
    if (!stateChangeHeart) {
      removeFavorited();
    }
  };

  // const verifyHeart = () => {
  //   const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favorited) {
  //     const filterLocalStorage = favorited.some((element) => element.id === id);
  //     if (filterLocalStorage) {
  //       setStateChangeHeart(false);
  //     }
  //   }
  // };

  // useEffect(verifyHeart, []);

  const setInlocalStorage = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (saveRecipe && !favorited) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([saveRecipe]));
    } else if (saveRecipe) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorited, saveRecipe]));
    }
  };

  useEffect(setInlocalStorage, [saveRecipe]);
  const pathRoute = ['/receitas-favoritas', '/receitas-feitas'].includes(pathname);

  return (
    <button type="button" onClick={ () => { saveStorage(); changeHeart(); } }>
      <img
        src={ stateChangeHeart ? whiteHeartIcon : blackHeartIcon }
        alt="imagem de favoritar"
        // data-testid="favorite-btn"
        data-testid={ pathRoute ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  setStateChangeHeart: PropTypes.func.isRequired,
  stateChangeHeart: PropTypes.bool.isRequired,
  removeFavorited: PropTypes.func.isRequired,
};

export default FavoriteButton;
