import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  fetchIngredientesMeal,
  fetchNomeMeal,
  fetchFirstLetterMeal } from '../Service/foodApi';
import {
  fetchIngredientesDrinks,
  fetchFirstLetterDrinks,
  fetchNomeDrinks } from '../Service/drinkApi';

import RecipesContext from '../Context/RecipesContext';

function Lupa() {
  const { setResponseApiLupaMeal,
    setResponseApiLupaDrink } = useContext(RecipesContext);
  const [valuesSearch, setValuesSearch] = useState({});
  const { pathname } = useLocation();

  const handleChange = ({ target: { value, name, checked, type } }) => {
    const valueFiltered = (type === 'checkbox' ? checked : value);
    setValuesSearch({ ...valuesSearch, [name]: valueFiltered });
  };

  const alertMoreTwo = () => alert('Sua busca deve conter somente 1 (um) caracter');

  const getApi = () => {
    const input = valuesSearch.search;
    switch (valuesSearch.searchRadio) {
    case 'Ingredientes':
      if (pathname === '/bebidas') {
        return fetchIngredientesDrinks(input)
          .then((result) => setResponseApiLupaDrink(result))
          .catch(() => window.location.reload());
      }

      return fetchIngredientesMeal(input)
        .then((result) => setResponseApiLupaMeal(result))
        .catch(() => window.location.reload());
    case 'Nome':
      if (pathname === '/bebidas') {
        return fetchNomeDrinks(input)
          .then((result) => setResponseApiLupaDrink(result))
          .catch(() => window.location.reload());
      }

      return fetchNomeMeal(input).then((result) => setResponseApiLupaMeal(result))
        .catch(() => window.location.reload());
    case 'Primeira letra':
      if (pathname === '/bebidas') {
        return (input.length !== 1)
          ? alertMoreTwo()
          : fetchFirstLetterDrinks(input)
            .then((result) => setResponseApiLupaDrink(result))
            .catch(() => window.location.reload());
      }

      return (input.length !== 1) ? alertMoreTwo()
        : fetchFirstLetterMeal(input).then((result) => setResponseApiLupaMeal(result));
    default:
      break;
    }
  };

  return (
    <form>
      <label htmlFor="idSearch">
        <input
          id="idSearch"
          name="search"
          data-testid="search-input"
          placeholder="Buscar receitas"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio1">
        Ingredientes
        <input
          name="searchRadio"
          value="Ingredientes"
          type="radio"
          id="idRadio1"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio2">
        Nome
        <input
          name="searchRadio"
          value="Nome"
          type="radio"
          id="idRadio2"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio3">
        Primeira letra
        <input
          name="searchRadio"
          value="Primeira letra"
          type="radio"
          id="idRadio3"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => getApi() }
      >
        Buscar
      </button>
    </form>
  );
}
export default Lupa;
