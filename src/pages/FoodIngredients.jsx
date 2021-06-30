import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';

// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes
export default function FoodIngredients({ history }) {
  const { selectedFood } = useContext(RecipeContext);
  console.log(selectedFood);
  return (
    <div>
      <h4>ExploreMealsByIngredient</h4>
      <Header history={ history } title="Explorar Ingredientes" />
      <Footer />
    </div>
  );
}

FoodIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
