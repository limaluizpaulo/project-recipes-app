import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import store from '../../context/store';

export default function CategoryButton({ clickCategory, clickAll }) {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    const newCategories = (foods) ? (
      categoriesMeals.slice(0, categoriesLimit)) : (
      categoriesDrinks.slice(0, categoriesLimit));

    return (
      newCategories.map((category, index) => (
        <div key={ index } className="categoriesBtns">
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => clickCategory(category) }
          >
            {category.strCategory}
          </button>
        </div>
      ))
    );
  };

  return (
    <div className="categoriesBtns">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clickAll }
      >
        All
      </button>
      {renderButtons()}
    </div>
  );
}

CategoryButton.propTypes = {
  clickCategory: PropTypes.func.isRequired,
  clickAll: PropTypes.func.isRequired,
};
