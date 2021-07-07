import React, { useEffect, useState } from 'react';
import { getFoodRecipes } from '../services';
import './RecDrinks.css';

const SIX = 6;

function RecMeals() {
  const [recFoods, setRecFoods] = useState([]);

  useEffect(() => {
    const fetchRecFoods = async () => {
      const meals = await getFoodRecipes();
      setRecFoods(meals.slice(0, SIX));
    };
    fetchRecFoods();
  }, []);

  return (
    <section className="carousel">
      <div className="carousel--slides">
        {
          recFoods.map(({ strMealThumb, strMeal }, index) => (
            <>
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="carousel--slide"
              >
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                />
              </div>
              <h4
                data-testid={ `${index}-recomendation-title` }
              >
                {strMeal}
              </h4>
            </>
          ))
        }
      </div>
    </section>
  );
}

export default RecMeals;
