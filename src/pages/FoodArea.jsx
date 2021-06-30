import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar comidas por local de origem: /explorar/comidas/area
export default function FoodArea({ history }) {
  return (
    <div>
      <h4>ExploreMealsByOrigin</h4>
      <Header history={ history } title="Explorar Origem" />
      <Footer />
    </div>
  );
}

FoodArea.propTypes = {
  history: PropTypes.shape().isRequired,
};
