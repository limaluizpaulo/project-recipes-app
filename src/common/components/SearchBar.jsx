import React, { useContext, useState } from 'react';
import store from '../../context/store';
import {
  INGREDIENT_MEALS, NAME_MEALS, FIRSTLETTER_MEALS, fetchAPI,
} from '../../services/index';

export default function SearchBar() {
  const { recipes } = useContext(store);
  const [searchBar, setSearchBar] = useState({
    input: '',
    rate: '',
  });
  // ________________Function para pegar pesquisa searchBar__________________
  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setSearchBar({
      ...searchBar,
      [name]: value,
    });
  };

  // _____________function para fazer map com referencia da pesquisa__________
  const handleClick = () => {
    const { rate, input } = searchBar;
    const { foods } = recipes;
    if (rate === 'ingredient') {
      fetchAPI(`${INGREDIENT_MEALS}${input}`)
        .then((response) => console.log(response.meals));
      // setRecipes(addRecipes(meals.meals, drinks.drinks))
    }
    if (rate === 'name') {
      fetchAPI(`${NAME_MEALS}${input}`)
        .then((response) => console.log(response.meals));
    }
    if (rate === 'firstLetter') {
      if (input.length > 1 || !input.length) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      fetchAPI(FIRSTLETTER_MEALS + input)
        .then((response) => console.log(response.meals));
    }
  };

  return (

    <div>
      <div>
        <input
          type="text"
          name="input"
          // value={ searchbar }
          data-testid="search-input"
          onChange={ handleChange }
          placeholder="Buscar Receitas"
        />
      </div>
      <label htmlFor="r1">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
          id="r1"
          name="rate"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="r2">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="name-search-radio"
          id="r2"
          name="rate"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="r3">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
          id="r3"
          name="rate"
          value="firstLetter"
        />
        primeira letra
      </label>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar

        </button>
      </div>
    </div>

  );
}
