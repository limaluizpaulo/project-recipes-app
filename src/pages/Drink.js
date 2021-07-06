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

const Drink = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});
  const [msgCopy, setMsgCopy] = useState(false);
  const [iconFavorit, setIconFavorit] = useState(false);

  const blackOrWhite = () => (iconFavorit ? blackHeartIcon : whiteHeartIcon);
  const isFavorite = checkFavoriteId(id);

  useEffect(() => {
    if (isFavorite) setIconFavorit(true);
  }, [isFavorite]);

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  const addFavorite = () => {
    const favorites = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];

    if (!iconFavorit) {
      const add = [...favorites, { id }];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id: idL }) => idL !== id);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  const textProgress = checkProgress(id) ? 'Continuar Receita' : 'Iniciar Receita';
  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderIngredients(drink)}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        onClick={ () => copy(`http://localhost:3000${history.location.pathname}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        { msgCopy ? 'Link copiado!' : 'Compartilhar' }
      </button>
      {/* Favorito */}
      <button onClick={ addFavorite } type="button">
        <img data-testid="favorite-btn" src={ blackOrWhite() } alt={ blackOrWhite() } />
      </button>
      {!checkRecypeId(id) && (
        <button
          className="footer"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/bebidas/${drink.idDrink}/in-progress`) }
        >
          {textProgress}
        </button>
      )}
      <br />
      <Carousel />
      <Link to="/bebidas"><button type="button">Voltar</button></Link>
      <br />
      <br />
    </div>
  );
};

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drink;
