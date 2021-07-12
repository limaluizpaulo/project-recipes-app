import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function favButton(favorited, id) {
  if (localStorage.favoriteRecipes) {
    const favoritos = JSON.parse(localStorage.favoriteRecipes);
    return (
      (favorited)
        ? (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="favorite icon"
          />
        )
        : (
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="favorite icon"
          />
        )
    );
  }
  return (
    (!favorited)
      ? (
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="favorite icon"
        />
      )
      : (
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="favorite icon"
        />
      )
  );
}

export default favButton;
