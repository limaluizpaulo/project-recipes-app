import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
<<<<<<< HEAD
import CocktailList from '../components/CocktailList';
=======
import Footer from '../components/Footer';
>>>>>>> 8ea6a4befe48fc5e030d51cb5fba4197d2e3f091

export default function Bebidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
<<<<<<< HEAD
      <Header title="Bebidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : null }
      <CocktailList />
=======
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <Footer />
>>>>>>> 8ea6a4befe48fc5e030d51cb5fba4197d2e3f091
    </div>
  );
}

Bebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
