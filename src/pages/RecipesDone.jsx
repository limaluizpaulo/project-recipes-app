import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesDone() {
  const rawDestructuredStorage = localStorage.getItem('doneRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage)[0];
  const { image, area, category, name, doneDate, tags } = destructuredStorage;
  return (
    <>
      <Header title="Receitas Feitas" />
      <button data-testid="filter-by-all-btn" type="button">Todas</button>
      <button data-testid="filter-by-food-btn" type="button">Comidas</button>
      <button data-testid="filter-by-drink-btn" type="button">Bebidas</button>
      <img
        data-testid="0-horizontal-image"
        alt="horizontal"
        src={ image }
        width="200px"
      />
      <h1
        data-testid="0-horizontal-top-text"
      >
        {`${area} - ${category}`}
      </h1>
      <h1 data-testid="0-horizontal-name">{name}</h1>
      <p data-testid="0-horizontal-done-date">{doneDate}</p>
      <button type="button">
        <img
          data-testid="0-horizontal-share-btn"
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      <div data-testid="0-Pasta-horizontal-tag">{tags[0]}</div>
      <div data-testid="0-Curry-horizontal-tag">{tags[1]}</div>
      <img data-testid="1-horizontal-image" alt="horizontal" />
      <h1 data-testid="1-horizontal-top-text">b</h1>
      <h1 data-testid="1-horizontal-name">b</h1>
      <button data-testid="1-horizontal-share-btn" type="button">b</button>
      <p data-testid="1-horizontal-done-date">b</p>
    </>
  );
}

export default RecipesDone;
