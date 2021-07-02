import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealList from '../components/MealList';

export default function Comidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Comidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : null }
      <MealList />
    </div>
  );
}

Comidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
