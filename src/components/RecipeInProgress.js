import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import { setConstants, toggleIngredient } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails() {
  const { details, ingredients, measures } = useContext(DetailsContext);
  const { inProgress, setInProgress } = useContext(UserContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const { imgKey, localStorageKey, nameKey, typePt } = setConstants(isDrinks);

  function handleClick({ target: { name } }) {
    toggleIngredient({ details, ingredient: name, inProgress, setInProgress });
  }

  function renderIngredients() {
    const usedIngredients = inProgress[localStorageKey][id] || [];

    return (
      <ul>
        {ingredients.map((ingredient, index) => {
          const wasUsed = usedIngredients.includes(ingredient);

          return (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ `checkbox-${index}` }
                className="ingredient-checkbox"
                name={ ingredient }
                key={ index }
                onClick={ handleClick }
                defaultChecked={ wasUsed }
              />
              <label
                htmlFor={ `checkbox-${index}` }
                className={ wasUsed ? 'line-through' : undefined }
              >
                {ingredient}
                {measures[index] && ` - ${measures[index]}`}
              </label>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section>
      <div className="details-image-container">
        <img
          className="details-image"
          src={ details[imgKey] }
          alt={ details[nameKey] }
          data-testid="recipe-photo"
        />
        <div>
          <FavoriteButton details={ details } />
          <ShareButton url={ `http://localhost:3000/${typePt}/${id}` } />
        </div>
      </div>
      <div className="details-text-container">
        <h2 data-testid="recipe-title">{details[nameKey]}</h2>
        <h5 data-testid="recipe-category">
          <span>{details.strCategory}</span>
          {isDrinks && <span>{` - ${details.strAlcoholic}`}</span>}
        </h5>
        <h3>Ingredients</h3>
        {renderIngredients()}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
      </div>
    </section>
  );
}

export default RecipeDetails;
