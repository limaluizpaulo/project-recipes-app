import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes
export default function DrinkIngredients({ history }) {
  return (
    <div>
      <h4>ExploreDrinksByIngredient</h4>
      <Header history={ history } title="Explorar Ingredientes" />
      <Footer />
    </div>
  );
}

DrinkIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
