import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsContext from '../context/details.context';
import { urlToEmbed } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './RecipeDetails.css';

function RecipeDetails() {
  const {
    details,
    ingredients,
    measures,
    imgKey,
    nameKey,
    isDrinks,
    typePt,
    setContentParams,
  } = useContext(DetailsContext);

  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setContentParams({ id, pathname });
  }, [id, pathname, setContentParams]);

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
      {!isDrinks && renderYoutubeVideo()}
    </div>
  );
}

export default RecipeDetails;
