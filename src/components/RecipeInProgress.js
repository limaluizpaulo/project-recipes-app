import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import { toggleIngredient } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails() {
  const { details, ingredients, measures } = useContext(DetailsContext);
  const { inProgress, setInProgress } = useContext(UserContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const typeKey = isDrinks ? 'cocktails' : 'meals';
  const typePt = isDrinks ? 'bebidas' : 'comidas';

  function renderIngredients() {
    const usedIngredients = inProgress[typeKey][id] || [];

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
                onClick={ ({ target: { name } }) => toggleIngredient({
                  recipe: details,
                  ingredient: name,
                  inProgress,
                  setInProgress,
                }) }
                defaultChecked={ wasUsed }
              />
              {ingredient}
              {measures[index] && ` - ${measures[index]}`}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <div className="details-image-container">
        <img
          className="details-image"
          src={ details[imgKey] }
          alt={ details[nameKey] }
          data-testid="recipe-photo"
        />
        <div>
          <FavoriteButton recipe={ details } />
          <ShareButton url={ `http://localhost:3000/${typePt}/${id}` } />
        </div>
      </div>
      <h2 data-testid="recipe-title">{details[nameKey]}</h2>
      <h4 data-testid="recipe-category">
        <span>{details.strCategory}</span>
        {isDrinks && <span>{` - ${details.strAlcoholic}`}</span>}
      </h4>
      {renderIngredients()}
      <p data-testid="instructions">{details.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
