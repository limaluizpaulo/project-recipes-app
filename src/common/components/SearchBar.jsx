import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import store, { addRecipes } from '../../context/store';
import {
  INGREDIENT_MEALS,
  NAME_MEALS, FIRSTLETTER_MEALS, fetchAPI,
  INGREDIENT_DRINKS, NAME_DRINKS, FIRSTLETTER_DRINKS,
} from '../../services';

export default function SearchBar() {
  const { recipes, setRecipes } = useContext(store);
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
  function setMeals(response) {
    const { drinks, categoriesMeals, categoriesDrinks } = recipes;
    setRecipes(addRecipes(
      response.meals, drinks, categoriesMeals, categoriesDrinks,
    ));
  }
  function setDrinks(response) {
    const { meals, categoriesMeals, categoriesDrinks } = recipes;
    setRecipes(addRecipes(
      meals, response.drinks, categoriesMeals, categoriesDrinks,
    ));
  }

  function setIgredient() {
    const { input } = searchBar;
    const { foods } = recipes;

    if (foods) {
      fetchAPI(`${INGREDIENT_MEALS}${input}`)
        .then((response) => setMeals(response));
    } else {
      fetchAPI(`${INGREDIENT_DRINKS}${input}`)
        .then((response) => setDrinks(response));
    }
  }

  function setName() {
    const { input } = searchBar;
    const { foods } = recipes;

    if (foods) {
      fetchAPI(`${NAME_MEALS}${input}`)
        .then((response) => setMeals(response));
    } else {
      fetchAPI(`${NAME_DRINKS}${input}`)
        .then((response) => setDrinks(response));
    }
  }
  function setFirstLetter() {
    const { input } = searchBar;
    const { foods } = recipes;

    if (foods) {
      fetchAPI(`${FIRSTLETTER_MEALS}${input}`)
        .then((response) => setMeals(response));
    } else {
      fetchAPI(`${FIRSTLETTER_DRINKS}${input}`)
        .then((response) => setDrinks(response));
    }
  }
  const handleClick = () => {
    const { rate, input } = searchBar;
    const er = input.length > 1 || !input;

    if (rate === 'firstLetter' && er) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (rate === 'ingredient') { setIgredient(); }

    if (rate === 'name') { setName(); }

    if (rate === 'firstLetter') { setFirstLetter(); }
  };

  return (
    <div className="mainContentSearchBar">
      <div className="searchBar">
        <div className="searchBarBox">
          <FaSearch className="searchBarIcon" />
          <input
            type="text"
            name="input"
            data-testid="search-input"
            onChange={ handleChange }
            placeholder="Buscar Receitas"
            className="searchBarInput"
          />
        </div>
        <div>
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
          <button
            type="button"
            data-testid="exec-search-btn"
            className="buttonSearch"
            onClick={ handleClick }
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
