import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import {
  fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter,
} from '../service';

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

  async function findDrinks() {
    let result;
    switch (filter) {
    case 'ingredient':
      result = await fetchDrinksByIngredient(search);
      if (result.drinks.length === 1) {
        history.push(`/bebidas/${result.drinks[0].idDrink}`);
      }
      break;
    case 'name':
      result = await fetchDrinksByName(search);
      if (result.drinks.length === 1) {
        history.push(`/bebidas/${result.drinks[0].idDrink}`);
      }
      break;
    default:
      if (search.length < 2) {
        result = await fetchDrinksByFirstLetter(search);
        if (result.drinks.length === 1) {
          history.push(`/bebidas/${result.drinks[0].idDrink}`);
        }
      } else {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    }
  }

  async function findMeals() {
    let result;
    switch (filter) {
    case 'ingredient':
      result = await fetchFoodByIngredient(search);
      if (result.meals.length === 1) {
        history.push(`/comidas/${result.meals[0].idMeal}`);
      }
      break;
    case 'name':
      result = await fetchFoodByName(search);
      if (result.meals.length === 1) {
        history.push(`/comidas/${result.meals[0].idMeal}`);
      }
      break;
    default:
      if (search.length < 2) {
        result = await fetchFoodByFirstLetter(search);
        if (result.meals.length === 1) {
          history.push(`/comidas/${result.meals[0].idMeal}`);
        }
      } else {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
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
              onClick={ pathname.includes('comidas') ? findMeals : findDrinks }
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
