import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../services';

function Header({ title, show = true }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [showSearch, setShowSearch] = useState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ingredient');

  function handleChange({ target }) {
    const { value } = target;
    setSearch(value);
  }

  // Créditos à Lucas Martins - Turma 10 - Tribo B
  function invokeAlert(fn, message) {
    fn(message);
  }

  async function getData() {
    let result = { drinks: [], meals: [] };
    const type = pathname.includes('comidas') ? 'meals' : 'drinks';

    if (filter === 'ingredient') {
      result = { ...result, ...await fetchByIngredient(type, search) };
    } else if (filter === 'name') {
      result = { ...result, ...await fetchByName(type, search) };
    } else if (search.length < 2) {
      result = { ...result, ...await fetchByFirstLetter(type, search) };
    } else {
      invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }

    console.log(result);

    if (result.drinks.length === 1) {
      history.push(`/bebidas/${result.drinks[0].idDrink}`);
    } else if (result.meals.length === 1) {
      history.push(`/comidas/${result.meals[0].idMeal}`);
    }
  }

  return (
    <header>
      <div>
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </button>
      </div>
      <div data-testid="page-title">{title}</div>
      <div>
        {show && (
          <button type="button" onClick={ () => setShowSearch(!showSearch) }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      </div>
      {showSearch && (
        <>
          <div>
            <input
              type="text"
              data-testid="search-input"
              id="search-input"
              name="search-input"
              defaultValue={ search }
              placeholder="Pesquisar"
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                id="ingredient-search-radio"
                name="search-radio"
                onChange={ () => setFilter('ingredient') }
                defaultChecked
              />
              Ingrediente
            </label>
            <label htmlFor="name-search-radio">
              <input
                type="radio"
                data-testid="name-search-radio"
                id="name-search-radio"
                name="search-radio"
                onChange={ () => setFilter('name') }
              />
              Nome
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                id="first-letter-search-radio"
                name="search-radio"
                onChange={ () => setFilter('letter') }
              />
              Primeira letra
            </label>
            <button
              data-testid="exec-search-btn"
              type="button"
              onClick={ getData }
            >
              <span>Buscar</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
