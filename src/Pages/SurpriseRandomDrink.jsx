import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchDrinkRandom } from '../apis/CocktailsApis';

export default function SurpriseRandomDrink() {
  const [drinkRandom, setDrinkRandom] = useState([]);

  const getDrinkRandom = async () => {
    const { drinks } = await fetchDrinkRandom();
    setDrinkRandom(drinks);
  };

  useEffect(() => {
    getDrinkRandom();
  }, []);

  console.log(drinkRandom);
  return (
    <Container>
      <h1>Drink Randômico</h1>
      {drinkRandom.map((drink) => (
        <main key={ drink.idDrink }>
          <h1>{drink.strDrink}</h1>
          <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          <ul>
            <li>{ drink.strIngredient1 }</li>
            <li>{ drink.strIngredient2 }</li>
            <li>{ drink.strIngredient3 }</li>
            <li>{ drink.strIngredient4 }</li>
            <li>{ drink.strIngredient5 }</li>
            <li>{ drink.strIngredient6 }</li>
          </ul>
          <h4>Instruções</h4>
          <p align="justify">{ drink.strInstructions }</p>
          <br />
          <iframe
            // data-testid="video"
            width="100%"
            title="Video"
            src={ drink.strVideo }
          />
        </main>
      ))}
      {/* <Instructions instructions={ instructions } /> */}
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
