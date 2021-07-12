import React from 'react';
import PropTypes from 'prop-types';

export default function BtnsFilters({ setValue }) {
  return (
    <div className="btns-filters">
      <button
        value="All"
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setValue('All') }
        className="btn btn-outline-success"
      >
        All
      </button>
      <button
        value="Food"
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setValue('Food') }
        className="btn btn-outline-success"
      >
        Food
      </button>
      <button
        value="Drinks"
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setValue('Drinks') }
        className="btn btn-outline-success"
      >
        Drinks
      </button>
    </div>
  );
}

BtnsFilters.propTypes = {
  setValue: PropTypes.func.isRequired,
};
