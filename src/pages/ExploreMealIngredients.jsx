import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar comidas: /explorar/comidas
export default function ExploreMealsIngredients({ history }) {
  return (
    <div>
      <h4>ExploreMealsIngredients</h4>
      <Header history={ history } title="Explorar Ingredientes" />
      <Footer />
    </div>
  );
}

ExploreMealsIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
