import React from 'react';

function Search() {
  return (
    <form>
      <label htmlFor="search">
        <input type="text" id="search" data-testid="search-input" />
      </label>

    </form>
  );
}

export default Search;
