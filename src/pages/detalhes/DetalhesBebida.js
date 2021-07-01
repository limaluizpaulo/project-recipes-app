import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MealsContext from '../../context/meals.context';
import { fetchDetails, fetchByName } from '../../services';

function DetalhesBebida() {
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { id } = useParams();
  const { setMeals } = useContext(MealsContext);

  async function getDetails() {
    const result = await fetchDetails('drinks', id);

    console.log(result);

    const array = Object.entries(result)
      .filter((item) => item[0].includes('Ingredient') && item[1])
      .map((item) => item[1]);
    setIngredients(array);

    const array2 = Object.entries(result)
      .filter((item) => item[0].includes('Measure') && item[1])
      .map((item) => item[1]);
    setMeasures(array2);

    setDetails(result);
  }

  async function getMeals() {
    const result = await fetchByName('meals');
    setMeals(result);
  }

  useEffect(() => {
    getDetails();
    getMeals();
  }, []);

  return (
    <main>
      <div>
        <img
          className="details-image"
          src={ details.strDrinkThumb }
          alt={ details.strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{ details.strDrink }</p>
        <p data-testid="recipe-category">
          { details.strCategory }
          -
          { details.strAlcoholic }
        </p>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { ingredient }
              {' '}
              -
              { measures[index] }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </div>
      <div>
        <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
      </div>
    </main>
  );
}

export default DetalhesBebida;

// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";

