import React, { useContext } from 'react';
import FoodDetails from '../components/foodDetailsPage/FoodDetails';
import FoodDetailsIngredientList
  from '../components/foodDetailsPage/FoodDetailsIngredientList';
import FoodVideoAndRecomendation
  from '../components/foodDetailsPage/FoodVideoAndRecomendation';
import RecipeContext from '../context/Context';
import FoodDetailsButton from '../components/foodDetailsPage/FoodDetailsButton';
import useFood from '../hooks/useFood';

// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes
export default function FoodIngredients() {
  const { selectedFood } = useContext(RecipeContext);

  useFood();

  if (!selectedFood) {
    return (
      <p>loading</p>
    );
  }
  return (
    <div>
      <section>
        <FoodDetails>
          <FoodDetailsIngredientList />
        </FoodDetails>
        <FoodVideoAndRecomendation />
        <FoodDetailsButton />
      </section>
    </div>
  );
}
