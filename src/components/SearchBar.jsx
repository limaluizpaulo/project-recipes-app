import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';
import {
  fetchMealsByIngre,
  fetchMealsByName,
  fetchMealsByFirstLetter } from '../services/mealsApi';
import { fetchDrinkByIngre,
  fetchDrinkByName,
  fetchDrinkByFirstLetter } from '../services/drinksApi';

export default function SearchBar() {
  const [state, setState] = useState({ filter: '', searchText: '' });
  const { pathname } = useHistory().location;
  const { setMealsFiltered } = useMealsContext();
  const { setDrinksFiltered } = useDrinksContext();
  const caracterAlert = alert;
  const notFoundAlert = alert;

  const NUM = 12;

  const handleValue = ({ target }) => {
    const { name } = target;
    setState({ ...state, [name]: target.value });
  };

  const handleDrinkFetch = async () => {
    const { filter, searchText } = state;

    let fetchDrinks = [];

    if (filter === 'ingredient') {
      fetchDrinks = await fetchDrinkByIngre(searchText);
    }
    if (filter === 'name') {
      fetchDrinks = await fetchDrinkByName(searchText);
    }
    if (filter === 'firstLetter' && searchText.length === 1) {
      fetchDrinks = await fetchDrinkByFirstLetter(searchText);
    }
    if (filter === 'firstLetter' && searchText.length > 1) {
      caracterAlert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (fetchDrinks) {
      setDrinksFiltered(fetchDrinks.slice(0, NUM));
    } else {
      notFoundAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const handleSubmit = async () => {
    let fetchMealsRes = [];
    const { filter, searchText } = state;

    if (pathname.includes('/comidas')) {
      if (filter === 'ingredient') {
        fetchMealsRes = await fetchMealsByIngre(searchText);
      }
      if (filter === 'name') {
        fetchMealsRes = await fetchMealsByName(searchText);
      }
      if (filter === 'firstLetter' && searchText.length === 1) {
        fetchMealsRes = await fetchMealsByFirstLetter(searchText);
      }
      if (filter === 'firstLetter' && searchText.length > 1) {
        caracterAlert('Sua busca deve conter somente 1 (um) caracter');
      }
    } else {
      handleDrinkFetch();
    }

    if (fetchMealsRes) {
      setMealsFiltered(fetchMealsRes.slice(0, NUM));
    } else {
      notFoundAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  return (
    <div>
      <div className="text-input">
        <input
          name="searchText"
          type="text"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ handleValue }
          className="form-control"
        />
      </div>
      <div className="radio-inputs">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            name="filter"
            value="ingredient"
            onClick={ handleValue }
          />
          Ingrediente

        </label>

        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="filter"
            value="name"
            onClick={ handleValue }

          />
          Nome
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="filter"
            value="firstLetter"
            onClick={ handleValue }

          />
          Primeira Letra
        </label>
      </div>
      <div className="button-search-food">

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
          className="btn btn-secondary"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
