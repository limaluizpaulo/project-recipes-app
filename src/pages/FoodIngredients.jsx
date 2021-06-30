import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodDetails from '../components/FoodDetails';
import IngredientList from '../components/IngredientList';
import FoodVideoAndRecomendation from '../components/FoodVideoAndRecomendation';

// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes
export default function FoodIngredients({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar Ingredientes" />
      <section>
        <FoodDetails>
          <IngredientList />
        </FoodDetails>
        <FoodVideoAndRecomendation />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </section>
      <Footer />
    </div>
  );
}

FoodIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
