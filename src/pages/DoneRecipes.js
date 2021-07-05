import React from 'react';
import DoneRecipe from '../components/DoneRecipe';
import Header from '../components/Header';

function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((recipe, index) => (<DoneRecipe
        key={ recipe.id }
        image={ recipe.image }
        index={ index }
        category={ recipe.category }
        recipeName={ recipe.name }
        recipeDate={ recipe.doneDate }
        recipeTags={ recipe.tags }
      />))}
    </div>
  );
}

export default DoneRecipes;
