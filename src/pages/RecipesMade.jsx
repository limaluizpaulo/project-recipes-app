import React, { Component } from 'react';
import CardsRecipes from '../components/CardsRecipes/CardsRecipes';

export default class RecipesMade extends Component {
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
            data-testid="filfter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div>
          <CardsRecipes />
        </div>
      </div>
    );
  }
}
