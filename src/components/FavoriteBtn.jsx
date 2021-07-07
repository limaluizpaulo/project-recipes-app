import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ id, type, currentRecipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const typePTBR = type === true ? 'comida' : 'bebida';
  // console.log(type);
  console.log(typePTBR);

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
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = getFavorites || [];

    let updated = [];

    if (favorites.find((el) => el.id === id)) {
      updated = favorites.filter((el) => el.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favorites,
          {
            id,
            type: typePTBR,
            area: strArea || '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic || '',
            name: strMeal || strDrink,
            image: strMealThumb || strDrinkThumb,
          }],
      ));
    }
    const favoritesUpdated = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(favoritesUpdated.some((el) => el.id === id));
  };
  useEffect(() => {
    const favoritesUpdated = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesUpdated) {
      setIsFavorite(favoritesUpdated.some((el) => el.id === id));
    }
  }, [isFavorite, id]);

  return (

    <button type="button" onClick={ saveAsFavorite }>
      {isFavorite
        ? (
          <img
            src={ blackHeartIcon }
            className="small-btn"
            alt="Ícone de coração"
            data-testid="favorite-btn"
          />)
        : (
          <img
            src={ whiteHeartIcon }
            className="small-btn"
            alt="Ícone de coração"
            data-testid="favorite-btn"
          />)}
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  currentRecipe: PropTypes.object,
}.isRequired;

export default FavoriteBtn;
