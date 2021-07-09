import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { getFilteredRecipes, setConstants } from '../helpers';

function SearchBar() {
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ingredient');
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { idKey, type, typePt } = setConstants(isDrinks);
  const setFn = isDrinks ? setDrinks : setMeals;

  async function handleClick() {
    const recipes = await getFilteredRecipes({ filter, type, searchTerm, setFn });
    if (recipes.length === 1) push(`/${typePt}/${recipes[0][idKey]}`);
  }

  return (
    <section>
      <div>
        <input
          type="text"
          id="search-input"
          className="text-input"
          name="search-input"
          onChange={ ({ target: { value } }) => setSearchTerm(value) }
        />
      </div>
      <div className="search-radio-container">
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            className="search-radio"
            name="search-radio"
            onChange={ () => setFilter('ingredient') }
            defaultChecked
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            className="search-radio"
            name="search-radio"
            onChange={ () => setFilter('name') }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            className="search-radio"
            name="search-radio"
            onChange={ () => setFilter('letter') }
          />
          First letter
        </label>
      </div>
      <div>
        <button type="button" className="alt-button" onClick={ handleClick }>
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
