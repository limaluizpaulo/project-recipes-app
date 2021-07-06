import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { getFilteredRecipes } from '../helpers/provider';

function SearchBar() {
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ingredient');
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const type = isDrinks ? 'drinks' : 'meals';
  const typePt = isDrinks ? 'bebidas' : 'comidas';
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const setFn = isDrinks ? setDrinks : setMeals;

  async function handleClick() {
    const recipes = await getFilteredRecipes({ filter, type, searchTerm, setFn });
    if (recipes.length === 1) push(`/${typePt}/${recipes[0][idKey]}`);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          id="search-input"
          name="search-input"
          onChange={ ({ target: { value } }) => setSearchTerm(value) }
          data-testid="search-input"
        />
      </div>
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            name="search-radio"
            onChange={ () => setFilter('ingredient') }
            defaultChecked
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            name="search-radio"
            onChange={ () => setFilter('name') }
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            name="search-radio"
            onChange={ () => setFilter('letter') }
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <div>
        <button
          type="button"
          className="button"
          onClick={ handleClick }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
