import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';

function CategoryButtons() {
  const {
    filter: filterDrinks,
    setCategory: setDrinksCategory,
  } = useContext(DrinksContext);

  const { filter: filterMeals, setCategory: setMealsCategory } = useContext(MealsContext);
  const history = useHistory();
  const { pathname } = history.location;

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
        onClick={ () => (pathname.includes('bebidas')
          ? setDrinksCategory(item.strCategory)
          : setMealsCategory(item.strCategory)) }
        data-testid={ `${item.strCategory}-category-filter` }
        key={ index }
        type="button"
      >
        {item.strCategory}
      </button>
    ));
  }

  return (
    <div>
      <button
        onClick={ () => (pathname.includes('bebidas')
          ? setDrinksCategory('')
          : setMealsCategory('')) }
        type="button"
      >
        ALL
      </button>
      {pathname.includes('bebidas')
        ? renderButtons(filterDrinks)
        : renderButtons(filterMeals)}
    </div>
  );
}

export default CategoryButtons;
