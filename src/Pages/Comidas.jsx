import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealList from '../components/MealList';
import CategoryFilter from '../components/CategoryFilter';

export default function Comidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Comidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : null }
      <CategoryFilter />
      <MealList />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
