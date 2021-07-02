import React, { useContext, useState } from 'react';

import { Form, Button } from 'react-bootstrap';
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
    <Form onSubmit={ handleSubmit }>
      {['radio'].map((type) => (
        <div key={ `inline-${type}` } className="mb-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input
              className="form-control"
              value={ textFilter }
              data-testid="search-input"
              type="text"
              placeholder="busca"
              name="checkbox"
              onChange={ (event) => setTextFilter(event.target.value) }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Check
              value={ typeOfFilter }
              data-testid="ingredient-search-radio"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              inline
              id="ingredient"
              label="Ingrediente"
              name="checkbox"
              type={ type }
            />
            <Form.Check
              value={ typeOfFilter }
              data-testid="name-search-radio"
              inline
              id="name"
              label="Nome"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              name="checkbox"
              type={ type }
            />
            <Form.Check
              value={ typeOfFilter }
              data-testid="first-letter-search-radio"
              inline
              id={ FIRST_LETTER }
              label="Primeira letra"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              name="checkbox"
              type={ type }
            />
          </Form.Group>
        </div>
      ))}
      <button
        className="btn btn-primary"
        data-testid="exec-search-btn"
        type="submit"
      >
        Buscar
      </button>
    </Form>
  );
}

export default SearchBar;
