import React, { useState } from 'react';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [radioButton, setRadioButton] = useState(' ingredients');

  const handleClick = () => {
    if (radioButton === 'ingrediente') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => console.log(meals));
    }

    if (radioButton === 'nome') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => console.log(meals));
    }

    // função tirada da ajuda do Lucas Martins no Slack
    const alertMessage = (func, message) => func(message);

    if (searchText.length > 1) {
      alertMessage(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }

    if (radioButton === 'primeira letra') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
        .then((res) => res.json())
        .then(({ meals }) => console.log(meals));
    }
  };

  return (
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
  );
}
export default SearchBar;
