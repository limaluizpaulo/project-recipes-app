import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CocktailList from '../components/CocktailList';

export default function Bebidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Bebidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : null }
      <CocktailList />
    </div>
  );
}

Bebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
