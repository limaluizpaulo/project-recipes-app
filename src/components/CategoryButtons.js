import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';

function CategoryButtons() {
  const { filter: filterDrinks } = useContext(DrinksContext);
  const { filter: filterMeals } = useContext(MealsContext);
  const history = useHistory();
  const { pathname } = history.location;
  console.log('buttons', filterMeals);

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
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
      <button type="button">ALL</button>
      {pathname.includes('bebidas')
        ? renderButtons(filterDrinks)
        : renderButtons(filterMeals)}
    </div>
  );
}

export default CategoryButtons;
