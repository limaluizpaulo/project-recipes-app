import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setItem, getItem } from './HelperFunctions';

export default function FavoriteButton(values) {
  const { data } = values;
  const { pathname } = useLocation();
  const { id } = useParams();
  const food = pathname.includes('bebidas') ? 'bebida' : 'comida';
  const favorited = getItem('favoriteRecipes');
  const favoritedCheck = favorited && favorited.some((i) => i.id === id);
  const [toggle, setToggle] = useState(favoritedCheck);
  const saveFavorite = (dataParam) => {
    // const favorited = getItem('favoriteRecipes');
    // const favoritedCheck = favorited.some((i) => i.id === id);
    if (favoritedCheck === false) {
      setToggle(true);
      setItem('favoriteRecipes', [...favorited, {
        id: dataParam.idMeal || dataParam.idDrink,
        type: food,
        area: dataParam.strArea || '',
        category: dataParam.strCategory,
        alcoholicOrNot: dataParam.strAlcoholic || '',
        name: dataParam.strMeal || dataParam.strDrink,
        image: dataParam.strMealThumb || dataParam.strDrinkThumb,
      }]);
    } else {
      setToggle(false);
      const remove = favorited.filter((j) => j.id !== id);
      setItem('favoriteRecipes', remove);
    }
  };
  return (
    <button
      type="button"
      onClick={ () => saveFavorite(data) }
    >
      <img
        src={ toggle ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}
