import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import { getDetails, setConstants, urlToEmbed } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import RecipesCarousel from './RecipesCarousel';

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
          <li key={ index }>
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
      />
    );
  }

  return (
    <section className="details-container">
      <div className="details-image-container">
        <img
          className="details-image"
          src={ details[imgKey] }
          alt={ details[nameKey] }
        />
        <div>
          <FavoriteButton details={ details } />
          <ShareButton url={ `http://localhost:3000/${typePt}/${id}` } />
        </div>
      </div>
      <div className="details-text-container">
        <h2>{details[nameKey]}</h2>
        <h5>
          <span>{details.strCategory}</span>
          {isDrinks && <span>{` - ${details.strAlcoholic}`}</span>}
        </h5>
        <h3>Ingredients</h3>
        {renderIngredients()}
        <h3>Instructions</h3>
        <p>{details.strInstructions}</p>
      </div>
      {!isDrinks && renderYoutubeVideo()}
      <RecipesCarousel />
    </section>
  );
}

export default RecipeDetails;
