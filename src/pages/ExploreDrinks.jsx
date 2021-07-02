import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientButton from '../components/ExploreIngredientButton';
import ExploreSurpriseButton from '../components/ExploreSurpriseButton';

// Tela de explorar bebidas: /explorar/bebidas
export default function ExploreDrinks({ history }) {
  return (
    <div>
      <h4>ExploreDrinks</h4>
      <Header history={ history } title="Explorar Bebidas" />
      <ExploreIngredientButton history={ history } />
      <ExploreSurpriseButton history={ history } />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};
