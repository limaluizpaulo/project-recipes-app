import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { fetchIdDrink } from '../Service/drinkApi';

export default function RecipesInProgressDrink() {
  const [disableButton, setDisableButton] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { stateDrink, setStateDrink } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateDrink[0]);
    const arrayKeysIngredients = keysIngredientes.filter(
      (e) => e.includes('strIngredient'),
    );
    const ingredient = [];
    const measures = [];

    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateDrink[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateDrink[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== '' && word !== null);
    const filtroMeasure = measures.filter((word) => word !== ' ' && word !== null);
    setIngredients(filtroIngredients);
    setMeasure(filtroMeasure);
    console.log(filtroIngredients, filtroMeasure);
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdDrink(id).then((result) => setStateDrink(result));
  };

  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateDrink]);
  const handleChange = ({ target: { checked } }) => {
    if (checked) {
      setDisableButton(disableButton + 1);
    } else { setDisableButton(disableButton - 1); }
  };
  const { strDrink, strMealThumb, strCategory, strInstructions } = stateDrink[0];
  return (
    <main>
      <img
        src={ strMealThumb }
        alt={ `Imagem ${strDrink}` }
        width="60px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <ShareButton />
      <FavoriteButton />
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            value={ index }

          >
            {`${ingredient} - `}
            <span data-testid={ `${index}-ingredient-step` }>
              {`${measure[index]}  `}
              <input
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
          disabled={ disableButton !== ingredients.length }

        >

          Finalizar Receita

        </button>
      </Link>
    </main>
  );
}
