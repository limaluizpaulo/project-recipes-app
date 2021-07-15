import React, { useContext } from 'react';
import FoodDetails from '../components/foodDetailsPage/FoodDetails';
import FoodDetailsIngredientList
  from '../components/foodDetailsPage/FoodDetailsIngredientList';
import FoodVideoAndRecomendation
  from '../components/foodDetailsPage/FoodVideoAndRecomendation';
import RecipeContext from '../context/Context';
import FoodDetailsButton from '../components/foodDetailsPage/FoodDetailsButton';
import useFood from '../hooks/useFood';
import loadingIcon from '../images/loading.gif';

// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes
export default function FoodIngredients() {
  const { selectedFood } = useContext(RecipeContext);

  useFood();

  if (!selectedFood) {
    return (
      <div className="foodDetails__loading">
        <img src={ loadingIcon } alt="loading" />
      </div>
    );
  }
  return (
    <section className="foodDetails">
      <FoodDetails>
        <FoodDetailsIngredientList />
      </FoodDetails>
      <FoodVideoAndRecomendation />
      <FoodDetailsButton />
    </section>
  );
}
