import React from 'react';

function FoodDetails() {
  return (
    <div>
      <img src="" alt="" data-testid="recipe-photo" />
      {' '}
      FOTO
      <h1 data-testid="recipe-title">TITULO</h1>
      <img src="" alt="" data-testid="share-btn" />
      {' '}
      Compartilhar
      <img src="" alt="" data-testid="favorite-btn" />
      {' '}
      FAVORITAR
      <span data-testid="recipe-category">sobre a categoria</span>
      <ul>
        <li data-testid="$-ingredient-name-and-measure">Ingredientes</li>
      </ul>
      <span data-testid="instructions">Instrução</span>
      <embed data-testid="video" src="" />
      <div data-testid="${''}-recomendation-card">receitas recomendadas</div>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar
      </button>
    </div>
  );
}

export default FoodDetails;
