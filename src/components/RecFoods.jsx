import React, { useState, useEffect } from 'react';
import { getFoodRecipes } from '../services';

const SIX = 6;

function RecFoods() {
  const [recFoods, setRecFoods] = useState([]);

  useEffect(() => {
    const fetchRecFoods = async () => {
      const meal = await getFoodRecipes();
      setRecFoods(meal.slice(0, SIX));
    };
    fetchRecFoods();
  }, []);

  const thumbFoods = recFoods.filter((recFood) => recFood.strThumbMeal);

  console.log(thumbFoods);

  return (
    <section>
      <span>Comidas para acompanhar</span>
      <br />
      {
        recFoods.map(({ strMeal, strMealThumb, idMeal }, key) => (
          <img
            data-testid={ `${key}-recomendation-card` }
            key={ idMeal }
            alt={ strMeal }
            src={ strMealThumb }
          />))
      }
    </section>
  );
}

export default RecFoods;
