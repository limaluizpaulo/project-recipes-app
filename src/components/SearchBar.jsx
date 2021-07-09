import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRecipeSearch } from '../services';

function SearchBar({ title, newRecipes }) {
  const [selectedRadio, setSelectedRadio] = useState('/filter.php?i=');
  const [inputValue, setInputValue] = useState('');
  const [endpointSearch, setEndpointSearch] = useState('');
  const [redirectTo, setRedirectTo] = useState(false);
  const dispatch = useDispatch();

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
      newRecipes(meals);
      /* dispatch({ type: 'card content', content: meals }); */
    }
    if (meals.length === 1) {
      setRedirectTo(`/comidas/${meals[0].idMeal}`);
    }
  };

  const drinksConditionals = ({ drinks }) => {
    console.log(drinks);
    if (drinks === null) {
      return makeAlert(alert,
        'Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks.length > 1) {
      /* dispatch({ type: 'card content', content: drinks }); */
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
    console.log(data);
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
      <form>
        <input
          data-testid="search-input"
          type="text"
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="ingredient-radio">
          Ingrediente
          <input
            checked={ selectedRadio === '/filter.php?i=' }
            id="ingredient-radio"
            type="radio"
            name="radio-search"
            data-testid="ingredient-search-radio"
            value="/filter.php?i="
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="name-radio">
          Nome
          <input
            checked={ selectedRadio === '/search.php?s=' }
            id="name-radio"
            type="radio"
            name="radio-search"
            data-testid="name-search-radio"
            value="/search.php?s="
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="first-letter-radio">
          Primeira letra
          <input
            checked={ selectedRadio === '/search.php?f=' }
            id="first-letter-radio"
            type="radio"
            name="radio-search"
            data-testid="first-letter-search-radio"
            value="/search.php?f="
            onChange={ (e) => handleChange(e) }
          />
        </label>
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
};

export default SearchBar;
