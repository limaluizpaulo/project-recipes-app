import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Proptypes from 'prop-types';
import { requestDrinkById, requestMeal } from '../../helpers/requests';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients';
import './Detalhes.css';

function DetalhesBebidas({ match }) {
  const [data, setData] = useState([]);
  const [recomm, setRecomm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const history = useHistory();
  const pathToCopy = history.location.pathname;
  const { id } = match.params;

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestDrinkById(id);
      const resolveRecomm = await requestMeal();
      setData(resolve);
      setRecomm(resolveRecomm);
      console.log(resolveRecomm);
      setLoading(false);
    }());
  }, []);

  function copyFunction() {
    clipboardCopy(`http://localhost:3000${pathToCopy}`);
    setCopied(true);
  }

  function renderButtons() {
    return (
      <>
        <button data-testid="share-btn" type="button" onClick={ copyFunction }>
          <img src={ shareIcon } alt="share icon" />
        </button>
        {copied ? <span>Link copiado!</span> : null}
        <button type="button">
          <img src={ whiteHeartIcon } alt="favorite icon" data-testid="favorite-btn" />
        </button>
      </>
    );
  }

  function AlcoholVerify(item) {
    if (item.strAlcoholic) {
      return <h5 data-testid="recipe-category">{item.strAlcoholic}</h5>;
    }
  }

  function mapRecomm(param) {
    const { meals } = param;
    const magicNumber = 6;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => {
        if (index === 0) {
          return (
            <div className="d-flex carousel-item active">
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  className="d-flex w-100"
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt={ `imagem de ${item}` }
                  id={ item.idMeal }
                />
                <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
              </div>
              <div
                key={ index }
                data-testid={ `${index + 1}-recomendation-card` }
              >
                <img
                  className="d-flex w-100"
                  data-testid={ `${index + 1}-card-img` }
                  src={ meals[index + 1].strMealThumb }
                  alt={ `imagem de ${meals[index + 1]}` }
                  id={ meals[index + 1].idMeal }
                />
                <p
                  data-testid={ `${index + 1}-recomendation-title` }
                >
                  {meals[index + 1].strMeal}
                </p>
              </div>
            </div>
          );
        }
        if (index !== 1) {
          return (
            <div
              className="carousel-item"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="d-block w-50"
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb }
                alt={ `imagem de ${item}` }
                id={ item.idMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
            </div>
          );
        }
        return null;
      });
  }

  function mapData(param) {
    const { drinks } = param;
    return drinks
      .map((item) => {
        const path = `/bebidas/${item.idDrink}`;
        if (path === history.location.pathname) {
          return (
            <>
              <img
                src={ item.strDrinkThumb }
                data-testid="recipe-photo"
                alt={ item.strDrink }
              />
              <h3 data-testid="recipe-title">{item.strDrink}</h3>
              {renderButtons()}
              {AlcoholVerify(item)}
              <label htmlFor="ingredients-list">
                Ingredientes:
                <ul id="ingredients-list">
                  {renderIngredients(item)}
                </ul>
              </label>
              <label htmlFor="instructions">
                Instruções de preparo:
                <p data-testid="instructions">{item.strInstructions}</p>
              </label>
              <p>Recomendações: </p>
              {mapRecomm(recomm)}
              <button
                className="start-button"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`/bebidas/${item.idDrink}/in-progress`) }
              >
                Iniciar Receita
              </button>
            </>
          );
        }
        return null;
      });
  }

  return (
    <div className="card-meals">
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetalhesBebidas;
