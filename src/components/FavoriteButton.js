import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import { toggleFavorite } from '../helpers/provider';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe }) {
  const { favorites, setFavorites } = useContext(UserContext);
  const isDrink = Object.keys(recipe).includes('idDrink');
  const idKey = isDrink ? 'idDrink' : 'idMeal';
  const isFavorite = favorites.some((item) => item.id === recipe[idKey]);

  return (
    <button
      type="button"
      className="button-svg"
      onClick={ () => toggleFavorite({ favorites, setFavorites, recipe }) }
    >
      <img
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
