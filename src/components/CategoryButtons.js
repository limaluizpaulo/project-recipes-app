import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { fetchByCategory, fetchByName } from '../services';
import './CategoryButton.css';

function CategoryButtons() {
  const { categories: drinksCategories, setDrinks } = useContext(DrinksContext);
  const { categories: mealsCategories, setMeals } = useContext(MealsContext);
  const [filter, setFilter] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  async function handleClick(category) {
    const type = pathname.includes('bebidas') ? 'drinks' : 'meals';
    const result = category && filter !== category
      ? await fetchByCategory(type, category)
      : await fetchByName(type);

    setFilter(category);
    if (pathname.includes('bebidas')) setDrinks(result);
    else setMeals(result);
  }

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
        type="button"
        className="category-button"
        key={ index }
        onClick={ () => handleClick(item) }
        data-testid={ `${item}-category-filter` }
      >
        {item}
      </button>
    ));
  }

  return (
    <div className="category-button-container">
      <button
        type="button"
        className="category-button"
        onClick={ () => handleClick('') }
        data-testid="All-category-filter"
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
