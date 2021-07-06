import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ clickFilter }) => (
  <div className="filters">
    <button
      type="button"
      data-testid="filter-by-all-btn"
      onClick={ () => clickFilter('') }
    >
      All
    </button>
    <button
      type="button"
      data-testid="filter-by-food-btn"
      onClick={ () => clickFilter('comida') }
    >
      Food
    </button>
    <button
      type="button"
      data-testid="filter-by-drink-btn"
      onClick={ () => clickFilter('bebida') }
    >
      Drinks
    </button>
  </div>
);

Filters.propTypes = {
  clickFilter: PropTypes.func.isRequired,
};

export default Filters;
