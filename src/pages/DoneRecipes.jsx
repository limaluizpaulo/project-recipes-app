import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

export default function DoneRecipes() {
  let recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!recipes) recipes = [];
  const { pathname } = useHistory().location;

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="btns-filters">
        <button
          value="All"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          value="Food"
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          value="Drinks"
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>
      <div className="recipe-cards" />
      {recipes.map((item, index) => (
        <div key={ item.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="avatar"
          />
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          {item.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.area}
              {' '}
              -
              {' '}
              {item.category}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot}
            </p>
          )}

          <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
          <div className="tags">
            {(item.type === 'comida' ? item.tags.slice(0, 2) : item.tags).map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </div>
          <ShareBtn pathname={ pathname } recipe={ item } index={ index } doneRecipe />
        </div>
      ))}

    </div>
  );
}
