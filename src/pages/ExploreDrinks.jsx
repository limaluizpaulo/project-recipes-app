import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar bebidas: /explorar/bebidas
export default function ExploreDrinks({ history }) {
  return (
    <div>
      <h4>ExploreDrinks</h4>
      <Header history={ history } title="Explorar Bebidas" />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};
