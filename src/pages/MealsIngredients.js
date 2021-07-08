/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';

import './style/MealsIngredients.css';

import { fetchIngredients } from '../services/recipesAPI';
import { MAX_CARDS_NUMBER } from '../services/allowanceToRender';

import RecipesContext from '../context/RecipesContext';

function MealsIngredients() {
  const {
    redirectToMainScreen,
    setRedirectToMainScreen,
    filterByIngredients,
    setFiltredByIngredients,
  } = useContext(RecipesContext);

  const [ingredients, setIngredients] = useState([]);
  const [maxCards] = useState(MAX_CARDS_NUMBER);

  const getIngredients = async () => {
    const { meals } = await fetchIngredients('meals');
    setIngredients(meals);
  };

  useEffect(() => {
    getIngredients();
    console.log('setFiltredByIngredients');
    setFiltredByIngredients(false);
  }, []);

  useEffect(() => () => setRedirectToMainScreen(false));

  const imgUrl = 'https://www.themealdb.com/images/ingredients/';
  return (
    <div>
      { redirectToMainScreen && <Redirect to="/comidas" /> }

      { ingredients.slice(0, maxCards).map(({ idIngredient, strIngredient }, index) => (
        <label
          data-testid={ `${index}-ingredient-card` }
          key={ idIngredient }
          htmlFor={ strIngredient }
          className="optionIngredients"
        >
          <input
            type="radio"
            onClick={ () => filterByIngredients(strIngredient) }
            id={ strIngredient }
            className="search-icon-radio"
          />
          <img
            data-testid={ `${index}-card-img` }
            src={ `${imgUrl}${strIngredient}-Small.png` }
            alt={ strIngredient }
            className="cardImage"
          />
          <p data-testid={ `${index}-card-name` }>
            { strIngredient }
          </p>
        </label>
      )) }
    </div>
  );
}

export default MealsIngredients;
