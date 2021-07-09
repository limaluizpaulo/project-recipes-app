import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { setConstants } from '../helpers';
import { fetchByCategory, fetchByName } from '../services';
import './CategoryButtons.css';

function CategoryButtons() {
  const { categories: drinksCategories, setDrinks } = useContext(DrinksContext);
  const { categories: mealsCategories, setMeals } = useContext(MealsContext);
  const [filter, setFilter] = useState('');
  const { location: { pathname } } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { type } = setConstants(isDrinks);

  async function handleClick(category) {
    const result = category && filter !== category
      ? await fetchByCategory(type, category)
      : await fetchByName(type);
    setFilter(category);

    if (isDrinks) setDrinks(result);
    else setMeals(result);
  }

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
        type="button"
        className="category-button"
        key={ index }
        onClick={ () => handleClick(item) }
      >
        {item}
      </button>
    ));
  }

  return (
    <section className="category-button-container">
      <button
        type="button"
        className="category-button"
        onClick={ () => handleClick('') }
      >
        ALL
      </button>
      {pathname.includes('bebidas')
        ? renderButtons(drinksCategories)
        : renderButtons(mealsCategories)}
    </section>
  );
}

export default CategoryButtons;
