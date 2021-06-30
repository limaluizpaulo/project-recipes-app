import React from 'react';

function Search() {
  return (
    <form>
      <label htmlFor="search">
        <input id="search" type="text" name="search" placeholder='Buscar Receita' data-testid="search-input" />
      </label>
      &nbsp;
      <label htmlFor="ingredient">
        <input id="ingredient" type="radio" name="" data-testid="ingredient-search-radio" />
        Ingrediente
      </label>
      &nbsp;
      <label htmlFor="name">
        <input id="name" type="radio" name="" data-testid="name-search-radio" />
        Nome
      </label>
      &nbsp;
      <label htmlFor="letter">
        <input id="letter" type="radio" name="" data-testid="first-letter-search-radio" />
        Primeira letra
      </label>
      &nbsp;
      <button type="submit" data-testid="exec-search-btn">Busca</button>
    </form>
  );
}

export default Search;
