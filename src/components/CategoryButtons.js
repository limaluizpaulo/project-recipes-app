import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';

function CategoryButtons() {
  const {
    categories: drinksCategories,
    setFilter: setDrinksFilter,
  } = useContext(DrinksContext);

  const {
    categories: mealsCategories,
    setFilter: setMealsFilter,
  } = useContext(MealsContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  function handleClick(category) {
    if (pathname.includes('bebidas')) {
      setDrinksFilter(category);
    } else {
      setMealsFilter(category);
    }
  }

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
        type="button"
        key={ index }
        onClick={ () => handleClick(item) }
        data-testid={ `${item}-category-filter` }
      >
        {item}
      </button>
    ));
  }

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick('') }
      >
        ALL
      </button>
      {pathname.includes('bebidas')
        ? renderButtons(drinksCategories)
        : renderButtons(mealsCategories)}
    </div>
  );
}

export default CategoryButtons;
