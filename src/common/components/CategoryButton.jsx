import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import PropTypes from 'prop-types';
import RenderButtons from './RenderButtons';

export default function CategoryButton({ clickCategory, foodOrDrink, clickAll, path }) { // Desestruturação de props
  return (
    <div className="categoriesBtns">
      <button
        type="button"
        data-testid={ path ? 'filter-by-all-btn' : 'All-category-filter' }
        onClick={ clickAll }
      >
        {(!path) && <FaBookOpen />}
        All
      </button>
      <RenderButtons
        clickCategory={ clickCategory }
        foodOrDrink={ foodOrDrink }
        path={ path }
      />
    </div>
  );
}

CategoryButton.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  path: PropTypes.bool,
};

CategoryButton.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  path: false,
};
