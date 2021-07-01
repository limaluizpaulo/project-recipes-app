import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { GlobalContext } from '../context/Provider';

const SearchBar = ({ food }) => {
  const [option, setOption] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  let { recipes: { meals = [], drinks = [] } } = useContext(GlobalContext);
  const { setSearchOp } = useContext(GlobalContext);

  if (!meals) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    meals = [];
  }
  if (!drinks) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    drinks = [];
  }
  if (meals.length === 1 && meals) {
    const id = meals[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }
  if (drinks.length === 1) {
    const id = drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  }

  return (
    <div>
      <label htmlFor="search">
        <input
          value={ inputSearch }
          onChange={ ({ target: { value } }) => setInputSearch(value) }
          id="search"
          type="text"
          data-testid="search-input"
        />
        Explorar:
      </label>
      <div onChange={ ({ target: { value } }) => setOption(value) }>
        <label htmlFor="radioIngredient">
          <input
            id="radioIngredient"
            value="ingredient"
            name="radiobutton"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="radioName">
          <input
            id="radioName"
            value="name"
            name="radiobutton"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="radioFirstLetter">
          <input
            id="radioFirstLetter"
            value="firstLetter"
            name="radiobutton"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <button
          onClick={ () => {
            if (inputSearch.length > 1 && option === 'firstLetter') {
              return global.alert('Sua busca deve conter somente 1 (um) caracter');
            }
            setSearchOp({ option, inputSearch, food });
          } }
          type="button"
          data-testid="exec-search-btn"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  food: PropTypes.bool.isRequired,
};

export default SearchBar;
