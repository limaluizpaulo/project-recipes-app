import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CocktailList from '../components/CocktailList';
import Footer from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';

export default function Bebidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      { console.log('ef') }
      <Header title="Bebidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : undefined }
      <CategoryFilter type="drinks" />
      <CocktailList />
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
