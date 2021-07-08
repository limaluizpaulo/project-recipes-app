import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchMealRandom } from '../apis/MealsApis';

export default function SurpriseRandomMeal() {
  const [mealRandom, setMealRandom] = useState([]);

  const getMealRandom = async () => {
    const { meals } = await fetchMealRandom();
    setMealRandom(meals);
  };

  useEffect(() => {
    getMealRandom();
  }, []);

  console.log(mealRandom);
  return (
    <Container>
      <h1>Drink Randômico</h1>
      {mealRandom.map((meal) => (
        <main key={ meal.idMeal }>
          <h1>{meal.strMeal}</h1>
          <img src={ meal.strMealThumb } alt={ meal.strMeal } />
          <ul>
            <li>{ meal.strIngredient1 }</li>
            <li>{ meal.strIngredient2 }</li>
            <li>{ meal.strIngredient3 }</li>
            <li>{ meal.strIngredient4 }</li>
            <li>{ meal.strIngredient5 }</li>
            <li>{ meal.strIngredient6 }</li>
          </ul>
          <h4>Instruções</h4>
          <p align="justify">{ meal.strInstructions }</p>
          <br />
          <iframe
            // data-testid="video"
            width="100%"
            title="Video"
            src={ meal.strVideo }
          />
        </main>
      ))}
      {/* <Button
        onClick={ () => renderInProgressPage() }
        data-testid="start-recipe-btn"
        variant="warning"
        block
      >
        Iniciar Receita
      </Button> */}
    </Container>
  );
}
