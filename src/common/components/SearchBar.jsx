import React, { useState } from 'react';

export default function SearchBar() {
  const [searchBar, setSearchBar] = useState({
    input: '',
    rate: '',
  });
  // ________________Function para pegar pesquisa searchBar__________________
  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setSearchBar({
      ...searchBar,
      [name]: value,
    });
  };

  // _____________function para fazer map com referencia da pesquisa__________
  const handleClick = () => {
    const { rate } = searchBar;
    if (rate === 'ingredient') {
      return console.log('ingrediente');
      // https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente};
    }
    if (rate === 'name') {
      return console.log('name');
      // https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
    }
    if (rate === 'firstLetter') {
      if (rate.length > '1') {
        alert('1');
      } else {
        return console.log('firsterLetter');
      }
      // https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
    }
  };

  return (

    <div>
      <div>
        <input
          type="text"
          name="input"
          // value={ searchbar }
          data-testid="search-input"
          onChange={ handleChange }
          placeholder="Buscar Receitas"
        />
      </div>
      <label htmlFor="r1">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
          id="r1"
          name="rate"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="r2">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="name-search-radio"
          id="r2"
          name="rate"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="r3">
        <input
          type="radio"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
          id="r3"
          name="rate"
          value="firstLetter"
        />
        primeira letra
      </label>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar

        </button>
      </div>
    </div>

  );
}
