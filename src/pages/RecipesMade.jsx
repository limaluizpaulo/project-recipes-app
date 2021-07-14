import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterButtons from '../components/FilterButtons';
import CardsRecipes from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesMade({ location: { pathname } }) {
  let salve;
  const initialFavorites = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(initialFavorites.meals);
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);
  console.log(filterFavorites.cocktails);

  function remove(Id) {
    const newArray = filterFavorites.filter(
      (recipe) => recipe.id !== Id,
    );
    setFilterFavorites(newArray);
    localStorage.favoriteRecipes = JSON.stringify(newArray);
  }

  if (initialFavorites !== null) {
    salve = false;
  } else {
    salve = true;
  }

  return (
    <div>
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        {salve ? 'Sem Feitos' : filterFavorites.map((aux, index) => (
          <CardsRecipes
            key={ aux.id }
            aux={ aux }
            index={ index }
            remove={ remove }
            pathname={ pathname }
          />
        ))}
      </div>
    </div>
  );
}

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesMade;
