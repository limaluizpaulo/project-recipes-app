import React, { useContext } from 'react';
import { FaUtensils, FaBreadSlice,
  FaDrumstickBite, FaIceCream, FaMitten } from 'react-icons/fa';
import store from '../../context/store';

export default function RenderButtons({ clickCategory, foodOrDrink, path }) {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

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
            {(!path) && mealsBtns[index]}
            {category.strCategory}
          </button>
        </div>
      ))
    );
  };
  return (
    renderButtons()
  );
}
