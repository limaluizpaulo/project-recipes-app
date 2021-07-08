import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { UserContext } from '../context/UserProvider';

const FavoriteButton = ({ id, recipe, index = 0 }) => {
  const { inFavorites, addFavorites, removeFavorites } = useContext(UserContext);

  return (
    <button
      type="button"
      onClick={ () => (inFavorites(id) ? removeFavorites(id) : addFavorites(recipe)) }
    >
      <img
        src={
          (inFavorites(id) ? blackHeartIcon : whiteHeartIcon)
        }
        alt=""
        data-testid={ `${index}-horizontal-favorite-btn favorite-btn` }
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,

};

export default FavoriteButton;
