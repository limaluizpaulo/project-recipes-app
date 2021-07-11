import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ScreenFavoriteButton({ id, index }) {
  const { favoriteFilters, setFavoriteFilters } = useContext(RecipesContext);

  const removeFavorited = () => {
    const filtersRemoved = favoriteFilters.filter((recipes) => recipes.id !== id);
    setFavoriteFilters(filtersRemoved);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtersRemoved));
    console.log(id, index);
  };

  return (
    <button type="button" onClick={ () => removeFavorited() }>
      <img
        src={ blackHeartIcon }
        alt="imagem de favoritar"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </button>
  );
}
//

ScreenFavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
