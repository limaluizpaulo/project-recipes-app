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
    </form>
  );
}

export default Search;
