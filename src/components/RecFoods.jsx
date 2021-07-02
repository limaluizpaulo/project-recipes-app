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
            <div key={ key }>
              <img
                data-testid={ `${key}-recomendation-card` }
                alt={ strMeal }
                src={ strMealThumb }
              />
              <h4 data-testid={ `${key}-recomendation-title` }>{strMeal}</h4>
              )
            </div>
          ))
        }
      </Carousel>
    </>
  );
}

export default RecFoods;
