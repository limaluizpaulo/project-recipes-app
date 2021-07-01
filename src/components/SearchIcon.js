import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../images/searchIcon.svg';

function SearchButton({ searchForm, setSearchForm }) {
  return (
    <label htmlFor="search-icon">
      <input
        type="radio"
        onClick={ () => setSearchForm(!searchForm) }
        id="search-icon"
        className="search-icon-radio"
      />
      <img
        src={ SearchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
        className="search-icon"
      />
    </label>
  );
}

SearchButton.propTypes = {
  searchForm: PropTypes.bool.isRequired,
  setSearchForm: PropTypes.func.isRequired,
};

export default SearchButton;
