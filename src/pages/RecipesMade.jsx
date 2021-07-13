import React from 'react';
import PropTypes from 'prop-types';
import CardsRecipes from '../components/CardsRecipes/CardsRecipes';

function RecipesMade({ location: { pathname } }) {
  console.log(pathname);
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

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesMade;
