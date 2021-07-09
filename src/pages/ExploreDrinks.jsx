import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientButton from '../components/ExploreIngredientButton';
import ExploreSurpriseButton from '../components/ExploreSurpriseButton';
import '../styles/explore.css';

// Tela de explorar bebidas: /explorar/bebidas
export default function ExploreDrinks({ history }) {
  return (
    <>
      <Header history={ history } title="Explorar Bebidas" />
      <div className="explorePage">
        <ExploreIngredientButton history={ history } />
        <ExploreSurpriseButton history={ history } />
      </div>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};
