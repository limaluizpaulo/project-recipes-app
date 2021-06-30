import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela de receitas feitas: /receitas-feitas
export default function DoneRecipes({ history }) {
  return (
    <Header history={ history } title="Receitas Feitas" />
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
