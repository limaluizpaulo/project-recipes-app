import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavoritesRecipes, checkFavoriteId } from '../services/localStorage';

const blackOrWhite = (iconFavorit) => (iconFavorit ? blackHeartIcon : whiteHeartIcon);

const FavoriteIcon = ({ recipe, idTest }) => {
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
  const { idDrink, strDrink, strDrinkThumb } = recipe;
  const idRecipe = idMeal || idDrink;
  const [iconFavorit, setIconFavorit] = useState(false);
  const favorites = getFavoritesRecipes() || [];

  useEffect(() => {
    if (checkFavoriteId(idRecipe)) setIconFavorit(true);
  }, [idRecipe]);

  const addFavorite = () => {
    const verify = favorites.find(({ id }) => id === idRecipe);
    if (!verify) {
      const add = [...favorites, {
        id: idMeal || idDrink,
        type: idMeal ? 'comida' : 'bebida',
        area: strArea || '',
        category: strCategory,
        alcoholicOrNot: idMeal ? '' : 'Alcoholic',
        name: strMeal || strDrink,
        image: strMealThumb || strDrinkThumb,
      }];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id }) => id !== idRecipe);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  const icon = blackOrWhite(iconFavorit);

  return (
    <button onClick={ addFavorite } type="button">
      <img
        data-testid={ idTest }
        src={ icon }
        alt={ icon }
      />
    </button>
  );
};

FavoriteIcon.propTypes = {
  recipe: PropTypes.oneOfType([PropTypes.object]).isRequired,
  idTest: PropTypes.string.isRequired,
};

export default FavoriteIcon;
