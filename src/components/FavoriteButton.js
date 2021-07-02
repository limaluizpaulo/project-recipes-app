import React from 'react';

import whiteFavIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  return (
    <button
      type="button"
      className="button-svg"
      onClick={ () => toggleFavorite() }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteFavIcon }
        alt="Favoritar"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavoriteButton;
