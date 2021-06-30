import React from 'react';

function Search() {
  return (
    <form>
      <label htmlFor="search">
        <input type="text" id="search" data-testid="search-input" />
      </label>
      <label htmlFor="ingredients">
        <input type="checkbox" id="ingredients" data-testid="ingredient-search-radio" />
      </label>
      <label htmlFor="name">
        <input type="checkbox" id="name" data-testid="name-search-radio" />
      </label>
    </form>
  );
}

export default Search;
