import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import invokeAlert from '../helpers';
import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../services';
import './Header.css';

function Header({ title, show = true }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [showSearch, setShowSearch] = useState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ingredient');
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);

  function handleChange({ target }) {
    const { value } = target;
    setSearch(value);
  }

  function setData(result) {
    if (pathname.includes('bebidas')) {
      setDrinks(result);
    } else {
      setMeals(result);
    }

    if (result.length === 1) {
      if (pathname.includes('bebidas')) {
        history.push(`/bebidas/${result[0].idDrink}`);
      } else {
        history.push(`/comidas/${result[0].idMeal}`);
      }
    }
  }

  async function getData() {
    const type = pathname.includes('bebidas') ? 'drinks' : 'meals';
    let result;

    if (filter === 'ingredient') {
      result = await fetchByIngredient(type, search);
    } else if (filter === 'name') {
      result = await fetchByName(type, search);
    } else if (search.length === 1) {
      result = await fetchByFirstLetter(type, search);
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

  return (
    <header>
      <div>
        <button
          type="button"
          className="button-svg"
          onClick={ () => history.push('/perfil') }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </button>
        <h2 data-testid="page-title">{title}</h2>
        {show && (
          <button
            type="button"
            className="button-svg"
            onClick={ () => setShowSearch(!showSearch) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      </div>
      {showSearch && (
        <div>
          <div>
            <input
              type="text"
              data-testid="search-input"
              id="search-input"
              name="search-input"
              placeholder="Digite algo..."
              onChange={ handleChange }
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
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
