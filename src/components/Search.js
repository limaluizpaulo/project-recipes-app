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

  console.log(searchByFirstLetterDrink, searchByIngredientsDrink, searchByNameDrink);

  const ONE = 1;
  const DOZE = 12;

  async function submit(ev) {
    ev.preventDefault();

    if (radio === 'Ingrediente') {
      searchByIngredientsFood(inputSearch);
    }
    if (radio === 'Nome') {
      searchByNameFood(inputSearch);
    }
    if (radio === 'Primeira letra') {
      const object = await inputSearch.length === ONE
        ? searchByFirstLetterFood(inputSearch)
        : invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      const { meals } = await object.then((resolve) => resolve);
      if (meals.length > DOZE) {
        return setFirstMeals(meals.slice(0, DOZE));
      }
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
          checked
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
