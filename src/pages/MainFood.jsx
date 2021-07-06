import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderMeal from '../components/RenderMeal';
import RecipeContext from '../context/Context';
import RenderMealIngredient from '../components/RenderMealIngredient';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  const { previousIsExploreIngredients } = useContext(RecipeContext);

  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      {previousIsExploreIngredients ? <RenderMealIngredient /> : <RenderMeal /> }
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
