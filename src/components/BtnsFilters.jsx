import React from 'react';
import PropTypes from 'prop-types';

export default function BtnsFilters({ setValue }) {
  return (
    <div>
      <button
        value="All"
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setValue('All') }
      >
        All
      </button>
      <button
        value="Food"
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setValue('Food') }
      >
        Food
      </button>
      <button
        value="Drinks"
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setValue('Drinks') }
      >
        Drinks
      </button>
    </div>
  );
}

BtnsFilters.propTypes = {
  setValue: PropTypes.func.isRequired,
};
