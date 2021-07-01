import React, { useContext } from 'react';
import { Context } from '../context/ContextForm';
import searchByNameFood,
{ searchByFirstLetterFood, searchByIngredientsFood, searchByFirstLetterDrink,
  searchByIngredientsDrink, searchByNameDrink } from '../services/searchApi';

function Search() {
  const { radio,
    setRadio,
    inputSearch,
    setInputSearch,
    setFirstMeals } = useContext(Context);

  function invokeAlert(fn, message) {
    return fn(message);
  }

  const ONE = 1;
  const DOZE = 12;

  const atalho = async (func, element) => {
    const object = await func(element);
    const { meals } = await object;
    if (meals) {
      if (meals.length > DOZE) {
        return setFirstMeals(meals.slice(0, DOZE));
      }
      if (meals.length > 0) {
        return setFirstMeals(meals);
      }
    }
    return invokeAlert(alert,
      'Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  // console.log(searchByFirstLetterDrink, searchByIngredientsDrink, searchByNameDrink);

  async function submit(ev) {
    console.log(radio);
    ev.preventDefault();

    if (radio === 'Ingrediente') {
      return atalho(searchByIngredientsFood, inputSearch);
    }
    if (radio === 'Nome') {
      return atalho(searchByNameFood, inputSearch);
    }
    if (radio === 'Primeira letra') {
      const object = await inputSearch.length === ONE
        ? atalho(searchByFirstLetterFood, inputSearch)
        : invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <form onSubmit={ submit }>
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          value={ inputSearch }
          onChange={ ({ target }) => setInputSearch(target.value) }
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredients">
        Ingrediente
        <input
          name="radio"
          type="radio"
          value="Ingrediente"
          id="ingredients"
          onChange={ ({ target }) => setRadio(target.value) }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          name="radio"
          type="radio"
          value="Nome"
          id="name"
          onChange={ ({ target }) => setRadio(target.value) }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          name="radio"
          type="radio"
          value="Primeira letra"
          id="first-letter"
          onChange={ ({ target }) => setRadio(target.value) }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="submit" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}

export default Search;
