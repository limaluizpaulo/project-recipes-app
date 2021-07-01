import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ id, type, currentRecipe }) {
  const {
    strMeal,
    strMealThumb,
    strDrink,
    strDrinkThumb,
    strCategory,
    strArea,
    strAlcoholic,
  } = currentRecipe;

  const saveAsFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let updated = [];

    if (favorites.find((el) => el.id === id)) {
      updated = favorites.filter((el) => el.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favorites,
          {
            id,
            type,
            area: strArea || '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic || '',
            name: strMeal || strDrink,
            image: strMealThumb || strDrinkThumb,
          }],
      ));
    }
  };

  return (
    <button type="button" data-testid="favorite-btn" onClick={ saveAsFavorite }>
      <img src={ whiteHeartIcon } className="small-btn" alt="Ícone de coração" />
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  currentRecipe: PropTypes.object,
}.isRequired;

export default FavoriteBtn;
