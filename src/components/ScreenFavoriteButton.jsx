import React, { useState, useContext, useEffect } from 'react';
import { /* useLocation */ } from 'react-router-dom';
// import PropTypes from 'prop-types';

import RecipesContext from '../Context/RecipesContext';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ScreenFavoriteButton({ index }) {
  // const { pathname } = useLocation();
  // const { stateDrink, stateMeals } = useContext(RecipesContext);
  // const { idMeal, strMeal, strMealThumb, strCategory, strArea } = stateMeals[0];

  const { favoriteFilters } = useContext(RecipesContext);
  const [saveRecipe, setSaveRecipe] = useState('');
  // const [stateChangeHeart, setStateChangeHeart] = useState(true);

  const removeFavorited = (index) => {
    // const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteFilters);
    // favoriteFilters.filter((recipes) => {recipes.id ===  });

    if (favorited) {
      const filterLocalStorage = favorited.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  const setInlocalStorage = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (saveRecipe && !favorited) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([saveRecipe]));
    } else if (saveRecipe) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorited, saveRecipe]));
    }
  };

  // const changeHeart = () => {
  //   setStateChangeHeart(!stateChangeHeart);
  //   if (!stateChangeHeart) {
  //     removeFavorited();
  //   }
  // };

  // const verifyHeart = () => {
  //   const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favorited) {
  //     const filterLocalStorage = favorited.some((element) => element.id === id);
  //     if (filterLocalStorage) {
  //       setStateChangeHeart(false);
  //     }
  //   }
  // };

  useEffect(setInlocalStorage, [saveRecipe]);

  return (
    <button type="button" onClick={ () => removeFavorited() }>
      <img
        src={ blackHeartIcon }
        alt="imagem de favoritar"
        // data-testid="favorite-btn"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </button>
  );
}

// ScreenFavoriteButton.propTypes = {
//   setStateChangeHeart: PropTypes.func.isRequired,
//   stateChangeHeart: PropTypes.bool.isRequired,
//   removeFavorited: PropTypes.func.isRequired,
// };
