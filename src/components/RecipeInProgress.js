import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import { getDetails } from '../helpers';
import { toggleIngredient } from '../helpers/provider';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails({ ingredients, setIngredients }) {
  const { inProgress, setInProgress } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [measures, setMeasures] = useState([]);
  const {
    location: { pathname },
  } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const type = isDrinks ? 'drinks' : 'meals';
  const typeObj = isDrinks ? 'cocktails' : 'meals';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';
  const usedIngredients = inProgress[typeObj][id] || [];

  // if (!details) setDetails({ imgKey }); // Cypress bug

  useEffect(() => {
    async function setter() {
      const result = await getDetails(type, id);
      setDetails(result[0]);
      setIngredients(result[1]);
      setMeasures(result[2]);
    }
    setter();
  }, [id, setIngredients, type]);

  function handleCheck({ target: { name } }) {
    const params = {
      recipe: details,
      ingredient: name,
      inProgress,
      setInProgress,
    };
    toggleIngredient(params);
  }

  function renderIngredients() {
    return (
      <ul>
        {ingredients.map((ingredient, index) => {
          const wasUsed = usedIngredients.includes(ingredient);

          return (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                name={ ingredient }
                key={ index }
                type="checkbox"
                onClick={ (e) => handleCheck(e) }
                defaultChecked={ wasUsed }
              />
              {ingredient}
              {measures[index] && `- ${measures[index]}`}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <img
        className="details-image"
        src={ details[imgKey] }
        alt={ details[nameKey] }
        data-testid="recipe-photo"
      />
      <div>
        <h2 data-testid="recipe-title">{details[nameKey]}</h2>
        <div>
          <ShareButton />
          <FavoriteButton recipe={ details } />
        </div>
      </div>
      <h4 data-testid="recipe-category">
        <span>{details.strCategory}</span>
        {isDrinks && <span>{` - ${details.strAlcoholic}`}</span>}
      </h4>
      {renderIngredients()}
      <p data-testid="instructions">{details.strInstructions}</p>
    </div>
  );
}

RecipeDetails.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  setIngredients: PropTypes.func,
}.isRequired;

export default RecipeDetails;
