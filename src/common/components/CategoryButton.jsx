import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import RenderButtons from './RenderButtons';

import store from '../../context/store';

const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

export default function CategoryButton({ clickCategory, foodOrDrink, setState,
  clickAll, path }) { // Desestruturação de props
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  console.log(path);

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
              ? (() => foodOrDrink(category.strCategory, path, setState))
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
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  setState: PropTypes.func,
  path: PropTypes.string,
};

CategoryButton.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  setState: () => console.log('no state to set'),
  path: '',
};
