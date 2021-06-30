import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// Tela de explorar: /explorar;
export default function Explore({ history }) {
  return (
    <Header history={ history } title="Explorar" />
  );
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};
