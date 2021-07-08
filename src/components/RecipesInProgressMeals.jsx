import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { fetchIdMeals } from '../Service/foodApi';

export default function RecipesInProgress() {
  const [disableButton, setDisableButton] = useState(0);
  const { stateMeals, setStateMeals, ingredientsMeals, setIngredientsMeals,
    measureMeals, setMeasureMeals } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateMeals[0]);
    const arrayKeysIngredients = keysIngredientes.filter(
      (e) => e.includes('strIngredient'),
    );
    const ingredient = [];
    const measures = [];

    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateMeals[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateMeals[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== '' && word !== null);
    const filtroMeasure = measures.filter((word) => word !== ' ' && word !== null);
    setIngredientsMeals(filtroIngredients);
    setMeasureMeals(filtroMeasure);
    console.log(filtroIngredients, filtroMeasure);
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdMeals(id).then((result) => setStateMeals(result));
  };

  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateMeals]);
  const handleChange = ({ target: { checked, id } }) => {
    if (checked) {
      setDisableButton(disableButton + 1);
      const buttonCheck = document.getElementById(id);
      buttonCheck.classList.add('riscado');
    } else {
      setDisableButton(disableButton - 1);
      const buttonCheck = document.getElementById(id);
      buttonCheck.classList.remove('riscado');
    }
  };
  const { strMeal, strMealThumb, strCategory, strInstructions } = stateMeals[0];
  return (
    <main>
      <img
        src={ strMealThumb }
        alt={ `Imagem ${strMeal}` }
        width="60px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <ShareButton />
      <FavoriteButton />
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsMeals.map((ingredient, index) => (
          <li
            id={ ingredient }
            key={ index }
            value={ index }

          >
            {`${ingredient} - `}
            <span data-testid={ `${index}-ingredient-step` }>
              {`${measureMeals[index]}  `}
              <input
                id={ ingredient }
                value={ ingredient }
                type="checkbox"
                onChange={ handleChange }
              />
            </span>

          </li>
        ))}
      </ul>
      <div>
        <h4>Mode de Preparo</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disableButton !== ingredientsMeals.length }

        >

          Finalizar Receita

        </button>
      </Link>
    </main>
  );
}
