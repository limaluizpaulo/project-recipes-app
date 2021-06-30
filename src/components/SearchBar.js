import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/Provider';

const SearchBar = ({ food }) => {
  const [option, setOption] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const { setSearchOp } = useContext(GlobalContext);

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
