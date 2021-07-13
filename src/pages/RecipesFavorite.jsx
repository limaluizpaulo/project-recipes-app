import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardsRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite() {
  let salve;
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);
  if (initialFavorites !== null) {
    salve = false;
  } else {
    salve = true;
  }
  console.log(salve);
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
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesFavorite;
