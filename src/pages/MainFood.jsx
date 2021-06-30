import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
