import React from 'react';

const SearchBar = () => {
  return (
    <section>
      <label htmlFor="search">
        <input id="search" type="text" data-testid="search-input" />
      </label>
      <label htmlFor="ingredient">
        <input id="ingredient" type="radio" data-testid="ingredient-search-radio" />
      </label>
      <label htmlFor="name-search">
        <input id="name-search" type="radio" data-testid="name-search-radio" />
      </label>
      <label htmlFor="first-letter">
        <input id="first-letter" type="radio" data-testid="first-letter-search-radio" />
      </label>
      <button id="search-btn" type="button" data-testid="exec-search-btn">Search</button>
    </section>
  )
};

export default SearchBar;
