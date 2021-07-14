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

const Drink = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  const textProgress = checkProgress(id) ? 'Continuar Receita' : 'Iniciar Receita';
  const url = `http://localhost:3000${history.location.pathname}`;

  return (
    <div className="conteiner-main">
      <div className="recipe">
        <h2 className="title" data-testid="recipe-title">{drink.strDrink}</h2>
        <h3 className="sub-title" data-testid="recipe-category">{drink.strAlcoholic}</h3>
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <section className="ingredient">
          <img src={ Rolo } alt="Imagem de um rolo" />
          <h3 className="sub-title">Ingredientes:</h3>
          <ul>
            {renderIngredients(drink)}
          </ul>
        </section>
        <p data-testid="instructions" className="instructions">{drink.strInstructions}</p>
        <div className="sharedFavoriteButton">
          <ShareButton url={ url } msgShare="Compartilhar" idTest="share-btn" />
          <FavoriteIcon recipe={ drink } idTest="favorite-btn" />
        </div>
        <Carousel />
        <Link to="/bebidas"><button type="button">Voltar</button></Link>
      </div>
      <div className="button-iniciar-receita">
        {!checkRecypeId(id) && (
          <button
            className="btn-start-recip"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/bebidas/${drink.idDrink}/in-progress`) }
          >
            {textProgress}
          </button>
        )}
      </div>
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
