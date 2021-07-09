import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardsRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite() {
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);

  const removeFavorites = (Id) => {
    const newArray = initialFavorites.filter(
      (recipe) => recipe.id !== Id,
    );
    setFilterFavorites(newArray);
    localStorage.favoriteRecipes = JSON.stringify(newArray);
  };

  return (
    <div>
      <Header />
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        {filterFavorites.map((aux, index) => (
          <CardsRecipesFavorite
            key={ index }
            aux={ aux }
            index={ index }
            removeFavorites={ removeFavorites }
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesFavorite;
