import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite() {
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);
  return (
    <div>
      <Header />
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        {filterFavorites.map((aux, index) => (
          <CardRecipesFavorite
            key={ index }
            aux={ aux }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesFavorite;
