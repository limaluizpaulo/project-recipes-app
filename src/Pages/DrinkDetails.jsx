import React from 'react';

export default function DrinkDetails() {
  const index = 0;
  return (
    <div>
      <img data-testid="recipe-photo" alt="comida" />
      <h1 data-testid="recipe-title">title</h1>
      <button type="button" data-testid="share-btn">share</button>
      <button type="button" data-testid="favorite-btn">favorite</button>
      <h6 data-testid="recipe-category">category</h6>
      <ul>
        <li data-testid={ `${index}-ingredient-name-and-measure` }>show</li>
      </ul>
      <p data-testid="instructions">instructions</p>
      <img data-testid="video" alt="video" />
      <div data-testid={ `${index}-recomendation-card` }>
        cards
      </div>
      <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
    </div>
  );
}
