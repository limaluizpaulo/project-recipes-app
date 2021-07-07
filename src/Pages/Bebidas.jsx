import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Context from '../context/Context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CocktailList from '../components/CocktailList';
import Footer from '../components/Footer';

export default function Bebidas({ match: { url } }) {
  const { openSearchBar } = useContext(Context);

  return (
    <Container>
      <Header title="Bebidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : null }
      <CocktailList />
      <Footer />
    </Container>
  );
}

Bebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
