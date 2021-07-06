import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { recipeById } from '../services/requests';
import { checkRecypeId, checkProgress, checkFavoriteId } from '../services/localStorage';
import { renderIngredients } from '../utils';
import Carousel from '../components/Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Food = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [meal, setMeal] = useState({});
  const [msgCopy, setMsgCopy] = useState(false);
  const [iconFavorit, setIconFavorit] = useState(false);

  const blackOrWhite = () => (iconFavorit ? blackHeartIcon : whiteHeartIcon);

  const isFavorite = checkFavoriteId(id);

  useEffect(() => {
    if (isFavorite) setIconFavorit(true);
  }, [isFavorite]);

  useEffect(() => {
    recipeById(id, true).then(setMeal);
  }, [id, setMeal]);

  const addFavorite = () => {
    const favorites = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];

    if (!iconFavorit) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meal;
      const add = [...favorites, {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id: idL }) => idL !== id);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  const textProgress = checkProgress(id, true) ? 'Continuar Receita' : 'Iniciar Receita';

  return (
    <div>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      <ul>
        Ingredientes:
        {renderIngredients(meal)}
      </ul>
      <p data-testid="video">Video</p>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button
        onClick={ () => copy(`http://localhost:3000${history.location.pathname}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        { msgCopy ? 'Link copiado!' : 'Compartilhar' }
      </button>
      {/* Botão de favorito */}
      <button
        onClick={ addFavorite }
        type="button"
      >
        <img data-testid="favorite-btn" src={ blackOrWhite() } alt={ blackOrWhite() } />
      </button>
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
