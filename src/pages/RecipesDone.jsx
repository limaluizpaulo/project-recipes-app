import React from 'react';
import Header from '../components/Header';

function RecipesDone() {
  return (
    <>
      <Header title="Receitas Feitas" />
      <button data-testid="filter-by-all-btn" type="button">Todas</button>
      <button data-testid="filter-by-food-btn" type="button">Comidas</button>
      <button data-testid="filter-by-drink-btn" type="button">Bebidas</button>
      <img data-testid="0-horizontal-image" alt="horizontal" />
      <h1 data-testid="0-horizontal-top-text">a</h1>
      <h1 data-testid="0-horizontal-name">a</h1>
      <p data-testid="0-horizontal-done-date">a</p>
      <button data-testid="0-horizontal-share-btn" type="button">a</button>
      <div data-testid="0-Pasta-horizontal-tag">a</div>
      <div data-testid="0-Curry-horizontal-tag">a</div>
      <img data-testid="1-horizontal-image" alt="horizontal" />
      <h1 data-testid="1-horizontal-top-text">b</h1>
      <h1 data-testid="1-horizontal-name">b</h1>
      <button data-testid="1-horizontal-share-btn" type="button">b</button>
      <p data-testid="1-horizontal-done-date">b</p>
    </>
  );
}

export default RecipesDone;
