import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/contextRecipes';
import './RecommendedFood.css';

function RecommendedDrinks() {
  const { foodRec, setFoodRec } = useContext(ContextRecipes);
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setFoodRec(response.meals));
  }, [setFoodRec]);
  console.log(foodRec);
  const MAGIC_NUMBER = 6;

  return (
    <section className="scroll">
      { foodRec.map(({ strMeal, strMealThumb }, index) => index < MAGIC_NUMBER
            && (
              <div data-testid={ `${index}-recomendation-card` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  width="150px"
                  data-testid="recipe-photo"
                />
                <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
              </div>)) }
    </section>
  );
}

export default RecommendedDrinks;
