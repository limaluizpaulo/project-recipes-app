/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import './style/ExploreArea.css';

import { fetchAreas } from '../services/recipesAPI';
import { MAX_CARDS_NUMBER } from '../services/allowanceToRender';

import RecipesContext from '../context/RecipesContext';

function ExploreByArea() {
  const {
    filterByArea,
    redirectToRecipeDetails,
    lookDetailsRecipe,
    getInitialRecipes,
    recipes,
    recipeDetails,
    setRedirectToRecipeDetails,
  } = useContext(RecipesContext);

  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    const { meals } = await fetchAreas();
    setAreas([{ strArea: 'All' }, ...meals]);
  };

  const [maxCards] = useState(MAX_CARDS_NUMBER);

  useEffect(() => { getAreas(); }, [areas]);

  const getInicialRecipesAsync = async () => {
    await getInitialRecipes('meals');
  };

  useEffect(() => () => setRedirectToRecipeDetails(false), []);
  useEffect(() => () => getInitialRecipes('meals'), []);
  useEffect(() => {
    getInicialRecipesAsync();
  }, []);

  return (
    <div className="exploreArea">
      { redirectToRecipeDetails
        && <Redirect to={ `/comidas/${recipeDetails.idMeal}` } /> }
      ExploreArea
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ filterByArea }
      >
        { areas.map(({ strArea }, index) => (
          <option
            key={ index }
            data-testid={ `${strArea}-option` }
          >
            { strArea }
          </option>
        )) }
      </select>
      <br />
      { recipes.slice(0, maxCards).map(({ idMeal, strMeal, strMealThumb }, index) => (
        <label
          data-testid={ `${index}-recipe-card` }
          key={ index }
          htmlFor={ strMeal }
          className="optionIngredients"
        >
          <input
            type="radio"
            onClick={ () => lookDetailsRecipe({ idMeal, strMeal, strMealThumb }) }
            id={ strMeal }
            className="search-icon-radio"
          />
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
            className="cardImage"
          />
          <p data-testid={ `${index}-card-name` }>
            { strMeal }
          </p>
        </label>
      )) }
    </div>
  );
}

export default ExploreByArea;
