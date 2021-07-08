import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

function SearchBar() {
  const FIRST_LETTER = 'first-letter';
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');
  const { location: { pathname } } = useHistory();

  const { filterRecipesByIngredient, filterRecipesByName,
    filterRecipesByFirstLetter, setIsFiltred, setCategory,
  } = useContext(RecipesContext);

  const { filterDrinksByIngredient,
    filterDrinksByName, filterDrinksByFirstLetter,
    setIsFiltred: setIsFiltredDrinks, setCategory: setCategoryDrinks,
  } = useContext(DrinksContext);

  function invokeAlert(fn, message) {
    fn(message);
  }

  function submitDrinks() {
    setIsFiltredDrinks(true);
    setCategoryDrinks('All');
    if (pathname.includes('/bebidas')) {
      if (textFilter && typeOfFilter === 'ingredient') {
        filterDrinksByIngredient(textFilter);
      }

      if (textFilter && typeOfFilter === 'name') {
        filterDrinksByName(textFilter);
      }

      if (textFilter.length === 1 && typeOfFilter === FIRST_LETTER) {
        filterDrinksByFirstLetter(textFilter);
      }

      if (textFilter.length > 1 && typeOfFilter === FIRST_LETTER) {
        invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsFiltred(true);
    setCategory('All');

    if (pathname.includes('/comidas')) {
      if (textFilter && typeOfFilter === 'ingredient') {
        filterRecipesByIngredient(textFilter);
      }

      if (textFilter && typeOfFilter === 'name') {
        filterRecipesByName(textFilter);
      }

      if (textFilter.length === 1 && typeOfFilter === FIRST_LETTER) {
        filterRecipesByFirstLetter(textFilter);
      } else if (textFilter.length > 1 && typeOfFilter === FIRST_LETTER) {
        invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      }
    } else {
      submitDrinks();
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <div>
          <input
            className="form-control"
            value={ textFilter }
            data-testid="search-input"
            type="text"
            placeholder="busca"
            name="checkbox"
            onChange={ (event) => setTextFilter(event.target.value) }
          />
        </div>
      </div>
      <div className="radio" controlid="formBasicEmail">
        <div>
          <label htmlFor="ingredient">
            <input
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              data-testid="ingredient-search-radio"
              name="checkbox"
              type="radio"
              id="ingredient"
              className="form-check-input"
              value="null"
            />
            Ingrediente
          </label>
        </div>
        <div>
          <label htmlFor="name">
            <input
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              data-testid="name-search-radio"
              name="checkbox"
              type="radio"
              id="name"
              className="form-check-input"
              value="null"
            />
            Nome
          </label>
        </div>
        <div>
          <label htmlFor="first-letter">
            <input
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              data-testid="first-letter-search-radio"
              name="checkbox"
              type="radio"
              id="first-letter"
              className="form-check-input"
              value="null"
            />
            Primeira letra
          </label>
        </div>
      </div>
      <button
        className="btn btn-info btn-category"
        data-testid="exec-search-btn"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
