import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';

function CategoryButtons() {
  const { filter: filterDrinks } = useContext(DrinksContext);
  const { filter: filterMeals } = useContext(MealsContext);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <>
      <button type="button"> ALL </button>
      {filterDrinks.map((item, index) => {
        if (pathname.includes('bebidas')) {
          return (
            <button key={ index } type="button">
              {item.strCategory}
            </button>
          );
        }
        return (
          <button key={ index } type="button">
            {filterMeals.strCategory}
          </button>
        );
      })}
    </>
  );
}

export default CategoryButtons;
