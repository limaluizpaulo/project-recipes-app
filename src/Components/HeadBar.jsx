import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Header from './Header';

function HeadBar(props) {
  const [searchBar, setSearchBar] = useState(false);
  const { title } = props;
  return searchBar ? (
    <div>
      <Header title={ title } searchBar={ searchBar } setSearchBar={ setSearchBar } />
      <SearchBar title={ title } />
    </div>
  )
    : (
      <div>
        <Header title={ title } searchBar={ searchBar } setSearchBar={ setSearchBar } />
      </div>
    );
}

HeadBar.propTypes = PropTypes.string.isRequired;

export default HeadBar;
