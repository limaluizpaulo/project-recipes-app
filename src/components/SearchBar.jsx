import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRecipeSearch } from '../services';
import './css/searchbar.css';

function SearchBar({ title, newRecipes }) {
  const [selectedRadio, setSelectedRadio] = useState('/filter.php?i=');
  const [inputValue, setInputValue] = useState('');
  const [endpointSearch, setEndpointSearch] = useState('');
  const [redirectTo, setRedirectTo] = useState(false);
  const TWELVE = 12;

  useEffect(() => {
    const arrangeURL = () => {
      let URL = '';
      if (title === 'Comidas') {
        URL = 'https://www.themealdb.com/api/json/v1/1';
      } else {
        URL = 'https://www.thecocktaildb.com/api/json/v1/1';
      }
      setEndpointSearch(URL);
    };
    arrangeURL();
  }, [title]);

  const handleChange = ({ target }) => {
    if (target.type === 'radio') {
      setSelectedRadio(target.value);
    } else {
      setInputValue(target.value);
    }
  };

  const makeAlert = (func, message) => {
    func(message);
  };

  const mealsConditionals = ({ meals }) => {
    if (meals === null) {
      return makeAlert(alert,
        'Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals.length > 1) {
      newRecipes(meals.slice(0, TWELVE));
    }
    if (meals.length === 1) {
      setRedirectTo(`/comidas/${meals[0].idMeal}`);
    }
  };

  const drinksConditionals = ({ drinks }) => {
    if (drinks === null) {
      return makeAlert(alert,
        'Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks.length > 1) {
      newRecipes(drinks.slice(0, TWELVE));
    }
    if (drinks.length === 1) {
      setRedirectTo(`/bebidas/${drinks[0].idDrink}`);
    }
  };

  const redirectToConditionals = (data) => {
    if (title === 'Comidas') {
      return mealsConditionals(data);
    }
    return drinksConditionals(data);
  };

  const handleApiUrl = async () => {
    const newURL = `${endpointSearch}${selectedRadio}${inputValue}`;
    const data = await getRecipeSearch(newURL);
    redirectToConditionals(data);
  };

  const handleBtnClick = () => {
    if (selectedRadio === '/search.php?f='
    && inputValue.length !== 1) {
      makeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    } else {
      handleApiUrl();
    }
  };

  return (
    <section>
      <form className="search-form">
        <input
          data-testid="search-input"
          type="text"
          onChange={ (e) => handleChange(e) }
          placeholder="Digite sua busca"
          className="search-input-text"
        />
        <div className="search-radio">
          <label htmlFor="ingredient-radio">
            <input
              checked={ selectedRadio === '/filter.php?i=' }
              id="ingredient-radio"
              type="radio"
              name="radio-search"
              data-testid="ingredient-search-radio"
              value="/filter.php?i="
              onChange={ (e) => handleChange(e) }
            />
            Ingrediente
          </label>
          <label htmlFor="name-radio">
            <input
              checked={ selectedRadio === '/search.php?s=' }
              id="name-radio"
              type="radio"
              name="radio-search"
              data-testid="name-search-radio"
              value="/search.php?s="
              onChange={ (e) => handleChange(e) }
            />
            Nome
          </label>
          <label htmlFor="first-letter-radio">
            <input
              checked={ selectedRadio === '/search.php?f=' }
              id="first-letter-radio"
              type="radio"
              name="radio-search"
              data-testid="first-letter-search-radio"
              value="/search.php?f="
              onChange={ (e) => handleChange(e) }
            />
            Primeira letra
          </label>
        </div>
        <section>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleBtnClick() }
          >
            Buscar
          </button>
        </section>
      </form>
      { redirectTo && <Redirect to={ redirectTo } /> }
    </section>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  newRecipes: PropTypes.func.isRequired,
};

export default SearchBar;
