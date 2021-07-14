import React, { useState } from 'react';
import CardsRecipesFavorites from '../components/CardsRecipesFavorites';
import Header from '../components/Header';

function ReceitasFavoritas() {
  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [newRecipes, setNewRecipes] = useState(recipesFavorite);

  ReceitasFavoritas.displayName = 'Receitas Favoritas';

  if (recipesFavorite === null) {
    const favoriteRecipes = [];
    localStorage.setItem('doneRecipes', JSON.stringify(favoriteRecipes));
    setNewRecipes(favoriteRecipes);
  }

  const btnAll = () => {
    setNewRecipes(recipesFavorite);
  };

  const btnFood = () => {
    setNewRecipes(recipesFavorite.filter((recipe) => recipe.type === 'comida'));
  };

  const btnDrinks = () => {
    setNewRecipes(recipesFavorite.filter((recipe) => recipe.type === 'bebida'));
  };


  return (
    <div>
      <Header title={ ReceitasFavoritas.displayName } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ btnAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ btnFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ btnDrinks }
        >
          Drinks
        </button>
        <CardsRecipesFavorites recipesFilter={ newRecipes } />
      </section>
    </div>
  );
}

export default ReceitasFavoritas;
