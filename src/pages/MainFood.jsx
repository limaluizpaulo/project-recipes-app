import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  return (
    <Header history={ history } title="Comidas" />
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
