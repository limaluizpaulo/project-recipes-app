import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { removeFromLocalStorage } from '../services/helpers/localStorage';
import { UserContext } from '../context/UserProvider';

const FavoriteButton = ({ id, index = 0 }) => {
  const { removeFavorites } = useContext(UserContext);

  return (
    <button
      type="button"
      onClick={ () => {
        removeFromLocalStorage('favoriteRecipes', 'id', id);
        removeFavorites(id);
      } }
    >
      <img
        src={ blackHeartIcon }
        alt=""
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,

};

export default FavoriteButton;
