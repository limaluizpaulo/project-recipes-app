import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { setConstants } from '../helpers';
import { fetchByCategory, fetchByName } from '../services';

function CategoryButtons() {
  const { categories: drinksCategories, setDrinks } = useContext(DrinksContext);
  const { categories: mealsCategories, setMeals } = useContext(MealsContext);
  const [filter, setFilter] = useState('');
  const { location: { pathname } } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { type } = setConstants(isDrinks);

  async function getByCategory(category) {
    const result = category && filter !== category
      ? await fetchByCategory(type, category)
      : await fetchByName(type);

    setFilter(filter !== category ? category : '');
    if (isDrinks) setDrinks(result);
    else setMeals(result);
  }

  function renderButtons(categories) {
    return categories.map((item, index) => (
      <button
        type="button"
        className={ filter === item ? 'category-button-alt' : 'category-button' }
        key={ index }
        onClick={ () => getByCategory(item) }
      >
        {item}
      </button>
    ));
  }

  return (
    <section className="category-buttons-container">
      <button
        type="button"
        className={ !filter ? 'category-button-alt' : 'category-button' }
        onClick={ () => getByCategory('') }
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
