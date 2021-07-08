import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import { setConstants, toggleFavorite } from '../helpers';
import blackHeartIcon from '../svg/blackHeartIcon.svg';
import whiteHeartIcon from '../svg/whiteHeartIcon.svg';

function FavoriteButton({ recipe }) {
  const { favorites, setFavorites } = useContext(UserContext);
  const isDrinks = Object.keys(recipe).includes('idDrink');
  const { idKey } = setConstants(isDrinks);
  const isFavorite = favorites.some((item) => item.id === recipe[idKey]);

  return (
    <button
      type="button"
      className="button-svg-alt"
      onClick={ () => toggleFavorite({ favorites, setFavorites, recipe }) }
    >
      <img
        className="svg-small"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Add to Favorites"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default FavoriteButton;
