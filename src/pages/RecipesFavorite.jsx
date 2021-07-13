import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardsRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite({ location: { pathname } }) {
  let salve;
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);
  if (initialFavorites !== null) {
    salve = false;
  } else {
    salve = true;
  }
  return (
    <div>
      <Header />
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        {salve ? 'Sem Favorite' : filterFavorites.map((aux, index) => (
          <CardsRecipesFavorite
            key={ aux.id }
            aux={ aux }
            index={ index }
            filterFavorites={ filterFavorites }
            setFilterFavorites={ setFilterFavorites }
            pathname={ pathname }
          />
        ))}
      </div>
    </div>
  );
}

RecipesFavorite.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesFavorite;
