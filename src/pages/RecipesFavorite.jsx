import React, { Component } from 'react';
import CardRecipesFavorite from '../components/CardsRecipes/CardRecipesFavorite';

export default class RecipesFavorite extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div>
          <CardRecipesFavorite />
        </div>
      </div>
    );
  }
}
