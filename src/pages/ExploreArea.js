import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { fetchAreasRecipes } from '../services/RecipesAPI';
import RecipesContext from '../context/RecipesContext';
// import { Link } from 'react-router-dom';

import './style/ExploreArea.css';

function ExploreArea() {
  const {
    mealsOrDrinks,
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
    const { meals } = await fetchAreasRecipes(mealsOrDrinks);
    setAreas([{ strArea: 'All' }, ...meals]);
  };

  const DOZE = 12;
  const [maxCards/* setMaxCards */] = useState(DOZE);

  useEffect(() => {
    getAreas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setRedirectToRecipeDetails(false), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => getInitialRecipes(), []);

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

export default ExploreArea;
