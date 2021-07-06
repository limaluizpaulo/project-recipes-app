import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchIdDrink } from '../Service/drinkApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DrinksDetails() {
  const [stateDrink, setStateDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { pathname } = useLocation();

  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateDrink[0]);
    const arrayKeysIngredients = keysIngredientes.filter((e) => e.includes('strIngredient'));
    const ingredient = [];
    const measures = [];
    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateDrink[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateDrink[0][element]));

    setIngredients(ingredient.filter((e) => e !== null));
    setMeasure(measures.filter((e) => e !== null));
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdDrink(id).then((result) => setStateDrink(result));
  };
  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateDrink]);
  const { idDrink, strDrinkThumb, strDrink,
    strCategory, strInstructions, strAlcoholic,

  } = stateDrink[0];
  return (
    <div>
      <img src={ strDrinkThumb } alt="imagem da bebida" data-testid="recipe-photo" width="100px" />
      <h1 data-testid="recipe-title">{strDrink}</h1>

      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <p data-testid="recipe-category">
        {
          strAlcoholic
        }

      </p>
      <h2>Ingredientes</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { ingredient }
          </li>))}
        {measure.map((measur, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ measur }
          >
            { measur }
          </li>))}
      </ul>
      <h2>Instruções</h2>
      <p data-testid="instructions">
        {strInstructions}

      </p>
      {/* <ul>
        <li data-testid="${index}-recomendation-card"></li>
       </ul> */}
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}
