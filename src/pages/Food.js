import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeById } from '../services/requests';
import { checkRecypeId, checkProgress } from '../services/localStorage';
import { renderIngredients } from '../utils';
import Carousel from '../components/Carousel';
import FavoriteIcon from '../components/FavoriteIcon';
import ShareButton from '../components/ShareButton';
import Rolo from '../images/Rolo.svg';

const Food = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [meal, setMeal] = useState({});

  useEffect(() => {
    recipeById(id, true).then(setMeal);
  }, [id, setMeal]);

  const textProgress = checkProgress(id, true) ? 'Continuar Receita' : 'Iniciar Receita';
  const url = `http://localhost:3000${history.location.pathname}`;

  return (
    <div className="recipe">
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <section className="ingredient">
        <img src={ Rolo } alt="Imagem de um rolo" />
        <h1>Ingredientes:</h1>
        <ul>
          {renderIngredients(meal)}
        </ul>
      </section>
      <p data-testid="video">Video</p>
      <p data-testid="instructions" className="instructions">{meal.strInstructions}</p>
      <div className="sharedFavoriteButton">
        <ShareButton url={ url } msgShare="Compartilhar" idTest="share-btn" />
        <FavoriteIcon recipe={ meal } idTest="favorite-btn" />
      </div>
      {!checkRecypeId(id) && (
        <button
          className="footer"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/comidas/${meal.idMeal}/in-progress`) }
        >
          {textProgress}
        </button>
      )}
      <Carousel food />
      <br />
      <Link to="/comidas"><button type="button">Voltar</button></Link>
      <br />
      <br />
      <br />
    </div>
  );
};

Food.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Food;

// useEffect(() => {
// const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
// if (favorite) {
// const isFavorite =favorite.find((favorite) => favorite.id === id);
// if (isFavorite) setIconFavorite(true);
// setFavorite({
// favorites,
// })
// }
// }, []);
