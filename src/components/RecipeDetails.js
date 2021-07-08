import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import { getDetails, setConstants, urlToEmbed } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails() {
  const { details, setDetails, ingredients, measures } = useContext(DetailsContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const { idKey, imgKey, nameKey, type, typePt } = setConstants(isDrinks);

  useEffect(() => {
    if (details[idKey] !== id) getDetails({ id, type, setDetails });
  }, [details, setDetails, id, idKey, type]);

  function renderIngredients() {
    return (
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
            {measures[index] && ` - ${measures[index]}`}
          </li>
        ))}
      </ul>
    );
  }

  function renderYoutubeVideo() {
    return (
      <iframe
        className="youtube-video"
        src={ urlToEmbed(details.strYoutube) }
        title="Video da receita"
        data-testid="video"
      />
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
          <FavoriteButton details={ details } dataTestId="favorite-btn" />
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
      {!isDrinks && renderYoutubeVideo()}
    </section>
  );
}

export default RecipeDetails;
