import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar comidas: /explorar/comidas
export default function ExploreFoods({ history }) {
  return (
    <div>
      <h4>ExploreMeals</h4>
      <Header history={ history } title="Explorar Comidas" />
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};
