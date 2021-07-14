import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardsRecipesFavorite from '../components/CardsRecipes/CardsRecipesFavorite';

function RecipesFavorite() {
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filterFavorites, setFilterFavorites] = useState(initialFavorites);

  const removeFavorites = (Id) => {
    const newArray = filterFavorites.filter(
      (recipe) => recipe.id !== Id,
    );
    setFilterFavorites(newArray);
    localStorage.favoriteRecipes = JSON.stringify(newArray);
  };

  function returnFavorites() {
    if (filterFavorites) {
      filterFavorites.map((aux, index) => (
        <CardsRecipesFavorite
          key={ aux.id }
          aux={ aux }
          index={ index }
          removeFavorites={ removeFavorites }
          filterFavorites={ filterFavorites }
          setFilterFavorites={ setFilterFavorites }
        />
      ));
    }
    return <p>Sem receitas favoritas</p>;
  }

  return (
    <div>
      <Header />
      <FilterButtons
        initialFavorites={ initialFavorites }
        setFilterFavorites={ setFilterFavorites }
      />
      <div>
        { returnFavorites() }
      </div>
    </div>
  );
}

export default RecipesFavorite;
