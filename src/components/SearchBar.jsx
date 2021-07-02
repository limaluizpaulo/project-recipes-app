import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

function SearchBar() {
  const FIRST_LETTER = 'first-letter';
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');
  const { location: { pathname } } = useHistory();

  const { filterRecipesByIngredient, filterRecipesByName, filterRecipesByFirstLetter,
    // recipesFilter: { filteredRecipes },
    setIsFiltred, setCategory,
  } = useContext(RecipesContext);

  const { filterDrinksByIngredient,
    filterDrinksByName, filterDrinksByFirstLetter,
    // drinksFilter: { filteredDrinks },
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
      <div className="mb-3">
        <div className="mb-3 form-group" controlId="formBasicEmail">
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
      <div className="mb-3 form-group" controlid="formBasicEmail">
        <div className="form-check form-check-inline">
          <label htmlFor="ingredient" className="form-check-label">
            <input
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              data-testid="ingredient-search-radio"
              name="ingredient"
              type="radio"
              id="ingredient"
              className="form-check-input"
              value="null"
            />
            Ingrediente
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label htmlFor="name" className="form-check-label">
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
        <div className="form-check form-check-inline">
          <label htmlFor="first-letter" className="form-check-label">
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
        className="btn btn-primary"
        data-testid="exec-search-btn"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
