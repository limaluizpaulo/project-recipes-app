import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function ButtonFavorite({ id, favoriteRecipes, dataTest, reload }) {
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const recipesFavorites = JSON.parse(localStorage.favoriteRecipes);
      const recipeFavorite = recipesFavorites.find(({ id: idRecipe }) => id === idRecipe);

      if (recipeFavorite) {
        setHeartIcon(blackHeartIcon);
        setIsFavorite(true);
      } else {
        setHeartIcon(whiteHeartIcon);
        setIsFavorite(false);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [id]);

  const addFavorite = () => {
    const recipesFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipesFavorites.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorites));

    setHeartIcon(blackHeartIcon);
    setIsFavorite(true);
    if (reload) window.location.reload();
  };

  const removeFavorite = () => {
    const recipesFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRicipesFavorites = recipesFavorites
      .filter(({ id: idRecipe }) => id !== idRecipe);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newRicipesFavorites));
    setHeartIcon(whiteHeartIcon);
    setIsFavorite(false);
    if (reload) window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={ () => (isFavorite ? removeFavorite() : addFavorite()) }
    >
      <img
        data-testid={ dataTest }
        src={ heartIcon }
        alt="favorite icon"
      />
    </button>
  );
}

ButtonFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  favoriteRecipes: PropTypes.shape(Object).isRequired,
  dataTest: PropTypes.string.isRequired,
  reload: PropTypes.bool.isRequired,
};

export default ButtonFavorite;
