import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import store from '../../context/store';

const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

export default function CategoryButton({ clickCategory, foodOrDrink, clickAll, path }) { // Desestruturação de props
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    let newCategories;
    if (path) {
      newCategories = foodDrinkButtons;
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
            onClick={ path
              ? (() => foodOrDrink(category.strCategory))
              : (() => clickCategory(category)) }
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
  foodOrDrink: PropTypes.func,
  path: PropTypes.bool,
};

CategoryButton.defaultProps = {
  foodOrDrink: () => console.log('nothing to do!'),
  path: false,
};
