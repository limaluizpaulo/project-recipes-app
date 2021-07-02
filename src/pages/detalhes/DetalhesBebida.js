import React from 'react';

import RecipeDetails from '../../components/RecipeDetails';
import RecipesCarousel from '../../components/RecipesCarousel';

function DetalhesComida() {
  return (
    <main>
      <RecipeDetails />
      <RecipesCarousel />
      <div>
        <button type="button" data-testid="start-recipe-btn">
          Iniciar Receita
        </button>
      </div>
    </main>
  );
}

export default DetalhesComida;
