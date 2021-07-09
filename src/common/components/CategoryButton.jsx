import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaBookOpen, FaUtensils, FaBreadSlice,
  FaDrumstickBite, FaIceCream, FaMitten } from 'react-icons/fa';

import store from '../../context/store';

export default function CategoryButton({ clickCategory, clickAll }) {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    const mealsBtns = [<FaUtensils key={ 0 } />, <FaBreadSlice key={ 1 } />,
      <FaDrumstickBite key={ 2 } />, <FaIceCream key={ 3 } />, <FaMitten key={ 4 } />];

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
