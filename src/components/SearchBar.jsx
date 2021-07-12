import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [radioButton, setRadioButton] = useState(' ingredients');
  const { typeFunc, handleFoods, handleDrinks } = useContext(FetchContext);

  const handleClick = () => {
    if (typeFunc === 'comidas') {
      return handleFoods(radioButton, searchText);
    }

    if (typeFunc === 'bebidas') {
      return handleDrinks(radioButton, searchText);
    }
  };

  return (
    <div className="search">
      <form>
        <input
          type="text"
          name="searchText"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearchText(value) }
        />
        <label htmlFor="ingrendients">
          <input
            type="radio"
            id="ingredients"
            value="ingrediente"
            name="searchType"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => setRadioButton(value) }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            id="nome"
            value="nome"
            name="searchType"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => setRadioButton(value) }
          />
          Nome
        </label>
        <label htmlFor="primeiraLetra">
          <input
            type="radio"
            id="primeiraLetra"
            value="primeira letra"
            name="searchType"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setRadioButton(value) }
          />
          Primeira Letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </form>
    </div>

  );
}
export default SearchBar;
