import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
import RenderDrink from '../components/RenderDrink';
import RenderDrinkIngredient from '../components/RenderDrinkIngredient';

// Tela principal de receitas de bebidas: /bebidas;
export default function MainDrink({ history }) {
  const { previousIsExploreIngredients } = useContext(RecipeContext);

  return (
    <div>
      <Header history={ history } title="Bebidas" />
      {previousIsExploreIngredients ? <RenderDrinkIngredient /> : <RenderDrink /> }
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
