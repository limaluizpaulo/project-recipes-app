import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
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

  return (
    <>
      <span>Pratos recomendados</span>
      <Carousel>
        {
          recFoods.map(({ strMeal, strMealThumb, idMeal }, key) => (
            <img
              data-testid={ `${key}-recomendation-card` }
              key={ idMeal }
              alt={ strMeal }
              src={ strMealThumb }
            />))
        }
      </Carousel>
    </>
  );
}

export default RecFoods;
