import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getStorage, infoFavorite, setStorage } from '../../functions';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import store from '../../context/store';

export default function LikeButton({ recipe, captureFavorited }) { // Desestruturando props
  const { pathname } = useLocation();
  const { recipes: { foods } } = useContext(store);
  const [favorited, setFavorited] = useState(false);

  const clickLike = () => {
    const infoFav = infoFavorite(recipe, foods);

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
    captureFavorited(favorited); // botei aqui a função q captura
    console.log(favorited);
  };

  const checkFavStorage = () => {
    const infoFav = { id: recipe.idMeal || recipe.idDrink };
    const favInLS = getStorage('favoriteRecipes');
    const findFavInLS = favInLS.find((item) => item.id === infoFav.id);

    if (findFavInLS) {
      setFavorited(!favorited);
    }
  };
  const findLocation = () => {
    if (pathname.includes('/receitas-favoritas')) { setFavorited(true); }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(checkFavStorage, []);
  useEffect(findLocation, [pathname]);
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
  captureFavorited: PropTypes.func.isRequired,
};
