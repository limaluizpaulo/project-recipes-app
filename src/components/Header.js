import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { invokeAlert } from '../helpers';

import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../services';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, show = true }) {
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);
  const [showSearch, setShowSearch] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ingredient');
  const history = useHistory();
  const { pathname } = history.location;

  const isDrinks = pathname.includes('bebidas');

  function handleChange({ target }) {
    const { value } = target;
    setSearchTerm(value);
  }

  function setData(result) {
    if (isDrinks) {
      setDrinks(result);
    } else {
      setMeals(result);
    }

    if (result.length === 1) {
      if (isDrinks) {
        history.push(`/bebidas/${result[0].idDrink}`);
      } else {
        history.push(`/comidas/${result[0].idMeal}`);
      }
    }
  }

  async function getData() {
    const type = isDrinks ? 'drinks' : 'meals';

    let result;
    if (filter === 'ingredient') {
      result = await fetchByIngredient(type, searchTerm);
    } else if (filter === 'name') {
      result = await fetchByName(type, searchTerm);
    } else if (searchTerm.length === 1) {
      result = await fetchByFirstLetter(type, searchTerm);
    } else {
      invokeAlert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (result) {
      setData(result);
    } else {
      invokeAlert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
  }

  function renderSearchBar() {
    return (
      <div>
        <div>
          <input
            type="text"
            id="search-input"
            name="search-input"
            onChange={ handleChange }
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
              data-testid="ingredient-search-radio"
              defaultChecked
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
            onClick={ getData }
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }

  return (
    <header>
      <div>
        <button
          type="button"
          className="button-svg"
          onClick={ () => history.push('/perfil') }
        >
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">{title}</h2>
        {show && (
          <button
            type="button"
            className="button-svg"
            onClick={ () => setShowSearch(!showSearch) }
          >
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </button>
        )}
      </div>
      {showSearch && renderSearchBar()}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
