import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FaBookOpen, FaUtensils, FaBreadSlice,
  FaDrumstickBite, FaIceCream, FaMitten,
  FaGlassMartini, FaCocktail, FaMugHot, FaBeer, FaCoffee } from 'react-icons/fa';
import store from '../../context/store';

export default function RenderButtons({ clickCategory, foodOrDrink, clickAll, path }) {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderBtnAll = () => (
    <div>
      <button
        type="button"
        data-testid={ path ? 'filter-by-all-btn' : 'All-category-filter' }
        onClick={ clickAll }
      >
        {(!path) && <FaBookOpen />}
        <div className="categoryTitle">
          All
        </div>
      </button>
    </div>
  );

  const renderButtons = () => {
    const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

    const mealsBtns = [<FaUtensils key={ 0 } />, <FaBreadSlice key={ 1 } />,
      <FaDrumstickBite key={ 2 } />, <FaIceCream key={ 3 } />, <FaMitten key={ 4 } />];

    const drinksBtns = [<FaGlassMartini key={ 0 } />, <FaCocktail key={ 1 } />,
      <FaMugHot key={ 2 } />, <FaBeer key={ 3 } />, <FaCoffee key={ 4 } />];

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
        <div key={ index }>
          <button
            type="button"
            data-testid={ path
              ? `filter-by-${category.strCategory.toLowerCase()}-btn`
              : `${category.strCategory}-category-filter` }
            onClick={ path
              ? (() => foodOrDrink(category.strCategory))
              : (() => clickCategory(category)) }
          >
            {(!path) && (foods) ? mealsBtns[index] : drinksBtns[index]}
            {category.strCategory}
          </button>
        </div>
      ))
    );
  };
  return (
    <div className="containerBtns">
      <div className="categoriesBtns">
        {renderBtnAll()}
        {renderButtons()}
      </div>
    </div>
  );
}

RenderButtons.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  path: PropTypes.bool,
};

RenderButtons.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  path: false,
};
