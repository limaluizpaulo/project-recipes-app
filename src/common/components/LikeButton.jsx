import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getStorage, setStorage } from '../../functions';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import store from '../../context/store';

export default function LikeButton({ recipe }) { // Desestruturando props
  const { recipes: { foods } } = useContext(store);
  const [favorited, setFavorited] = useState(false);

  const clickLike = () => {
    const infoFav = {
      id: recipe.idMeal || recipe.idDrink,
      type: (foods) ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const favInLS = getStorage('favoriteRecipes');
    const findFavInLS = favInLS.find((item) => item.id === infoFav.id);

    if (!favorited) {
      if (!favInLS.length || !findFavInLS) {
        const favorites = [...favInLS, infoFav];
        setStorage('favoriteRecipes', favorites);
      }
    } else {
      const removedFav = favInLS.filter((item) => item.id !== infoFav.id);
      setStorage('favoriteRecipes', removedFav);
    }
    setFavorited(!favorited);
  };

  const checkFavStorage = () => {
    const infoFav = { id: recipe.idMeal || recipe.idDrink };
    const favInLS = getStorage('favoriteRecipes');
    const findFavInLS = favInLS.find((item) => item.id === infoFav.id);

    if (findFavInLS) {
      setFavorited(!favorited);
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(checkFavStorage, []);

  // ---------------------------------------------------------------------------------------------

  const renderButtons = () => (
    <button
      type="button"
      onClick={ clickLike }
    >
      <img
        src={ (favorited) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite-icon"
        data-testid="favorite-btn"
        width="30px"
      />
    </button>
  );
  return (
    <div>
      {renderButtons()}
    </div>
  );
}

LikeButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
