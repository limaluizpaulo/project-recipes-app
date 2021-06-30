import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela principal de receitas de bebidas: /bebidas;
export default function MainDrink({ history }) {
  return (
    <div>
      <h4>Drinks</h4>
      <Header history={ history } title="Bebidas" />
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
