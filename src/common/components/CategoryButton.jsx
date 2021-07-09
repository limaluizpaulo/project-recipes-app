import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaBookOpen, FaUtensils, FaBreadSlice,
  FaDrumstickBite, FaIceCream, FaMitten } from 'react-icons/fa';

import store from '../../context/store';

const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

export default function CategoryButton({ clickCategory, foodOrDrink, clickAll, path }) { // Desestruturação de props
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    const mealsBtns = [<FaUtensils key={ 0 } />, <FaBreadSlice key={ 1 } />,
      <FaDrumstickBite key={ 2 } />, <FaIceCream key={ 3 } />, <FaMitten key={ 4 } />];

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
            {mealsBtns[index]}
            {category.strCategory}
          </button>
        </div>
      ))
    );
  };

  return (
    <div className="categoriesBtns">
      <FaBookOpen />
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
