import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import store from '../../context/store';

const recipesMadeButton = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

export default function CategoryButton({ clickCategory, clickAll, path }) { // Desestruturação de props
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    let newCategories;
    if (path) {
      newCategories = recipesMadeButton;
    } else {
      newCategories = (foods) ? (
        categoriesMeals.slice(0, categoriesLimit)) : (
        categoriesDrinks.slice(0, categoriesLimit));
    }

    return (
      newCategories.map((category, index) => (
        <div key={ index } className="categoriesBtns">
          <button
            type="button"
            data-testid={ path
              ? `filter-by-${category.strCategory.toLowerCase()}-btn`
              : `${category.strCategory}-category-filter` }
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
        data-testid={ path ? 'filter-by-all-btn' : 'All-category-filter' }
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
  path: PropTypes.bool,
};

CategoryButton.defaultProps = {
  path: false,
};
