import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getStorage, infoFavorite, setStorage } from '../../functions';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import store from '../../context/store';

export default function LikeButton({ recipe,
  clickFavBtn, id, favPage, index }) { // Desestruturando props
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
      onClick={ favPage ? () => clickFavBtn(id) : clickLike }
    >
      <img
        src={ (favorited || favPage) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite-icon"
        data-testid={ favPage ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
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
  favPage: PropTypes.bool,
  index: PropTypes.number,
  id: PropTypes.string,
  clickFavBtn: PropTypes.func,
};

LikeButton.defaultProps = {
  favPage: false,
  index: 0,
  id: 0,
  clickFavBtn: () => console.log('nothing to click!'),
};
