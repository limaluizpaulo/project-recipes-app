import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela de explorar comidas por local de origem: /explorar/comidas/area
export default function FoodArea({ history }) {
  return (
    <Header history={ history } title="Explorar Origem" />
  );
}

FoodArea.propTypes = {
  history: PropTypes.shape().isRequired,
};
