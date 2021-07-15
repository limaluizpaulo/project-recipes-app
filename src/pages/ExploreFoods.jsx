import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientButton from '../components/ExploreIngredientButton';
import ExploreAreaButton from '../components/ExploreAreaButton';
import ExploreSurpriseButton from '../components/ExploreSurpriseButton';
import '../styles/explore.css';

// Tela de explorar comidas: /explorar/comidas
export default function ExploreFoods({ history }) {
  return (
    <>
      <Header history={ history } title="Explorar Comidas" />
      <div className="explorePage">
        <ExploreIngredientButton
          className="explore__button"
          history={ history }
        />
        <ExploreAreaButton
          className="explore__button"
          history={ history }
        />
        <ExploreSurpriseButton
          className="explore__button"
          history={ history }
        />
      </div>
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};
