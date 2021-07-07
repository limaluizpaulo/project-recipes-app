import React, { useEffect, useState } from 'react';
import HeaderExplore from '../components/HeaderExplore';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavouritesRecipes() {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipesFromStorage);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  return (
    <div>
      <HeaderExplore title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavoriteRecipes(recipesFromStorage) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFavoriteRecipes(recipesFromStorage
          .filter((recipe) => recipe.type === 'comida')) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFavoriteRecipes(recipesFromStorage
          .filter((recipe) => recipe.type === 'bebida')) }
      >
        Drink
      </button>
      <div>
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            favoriteRecipes={ recipe }
            index={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />
        )) }
      </div>
    </div>
  );
}

export default FavouritesRecipes;
