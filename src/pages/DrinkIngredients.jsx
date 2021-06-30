import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes
export default function DrinkIngredients({ history }) {
  return (
    <Header history={ history } title="Explorar Ingredientes" />
  );
}

DrinkIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
