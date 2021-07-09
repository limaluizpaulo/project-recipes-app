/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';

import './style/MealsIngredients.css';

import { fetchIngredients } from '../services/recipesAPI';
import { MAX_CARDS_NUMBER } from '../services/allowanceToRender';

import RecipesContext from '../context/RecipesContext';

function DrinksIngredients() {
  const {
    redirectToMainScreen,
    setRedirectToMainScreen,
    filterByIngredients,
    setFiltredByIngredients,
  } = useContext(RecipesContext);

  const [ingredients, setIngredients] = useState([]);
  const [maxCards] = useState(MAX_CARDS_NUMBER);

  const getIngredients = async () => {
    const { drinks } = await fetchIngredients('drinks');
    setIngredients(drinks);
  };

  useEffect(() => {
    getIngredients();
    setFiltredByIngredients(false);
  }, []);

  useEffect(() => () => setRedirectToMainScreen(false));

  const imgUrl = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      { redirectToMainScreen && <Redirect to="/bebidas" /> }
      { ingredients.slice(0, maxCards).map(({ strIngredient1 }, index) => (
        <label
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          htmlFor={ strIngredient1 }
          className="optionIngredients"
        >
          <input
            type="radio"
            onClick={ () => filterByIngredients('drinks', strIngredient1) }
            id={ strIngredient1 }
            className="search-icon-radio"
          />
          <img
            data-testid={ `${index}-card-img` }
            src={ `${imgUrl}${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
            className="cardImage"
          />
          <p data-testid={ `${index}-card-name` }>
            { strIngredient1 }
          </p>
        </label>
      )) }
    </div>
  );
}

export default DrinksIngredients;
