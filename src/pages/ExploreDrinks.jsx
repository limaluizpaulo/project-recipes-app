import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela de explorar bebidas: /explorar/bebidas
export default function ExploreDrinks({ history }) {
  return (
    <Header history={ history } title="Explorar Bebidas" />
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};
