import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestDrinkById, requestMeal } from '../../helpers/requests';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients';

function DetalhesBebidas() {
  const [data, setData] = useState([]);
  const [recomm, setRecomm] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const id = history.location.pathname;
  const numberToSub = 9;

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestDrinkById(id.substring(numberToSub));
      const resolveRecomm = await requestMeal();
      setData(resolve);
      setRecomm(resolveRecomm);
      console.log(resolveRecomm);
      setLoading(false);
    }());
  }, []);

  function renderButtons() {
    return (
      <>
        <button type="button">
          <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
        </button>
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
            <div
              className="carousel-item active"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="d-block w-100"
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb }
                alt={ `imagem de ${item}` }
                id={ item.idMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
            </div>
          );
        }
        return (
          <div
            className="carousel-item"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ `imagem de ${item}` }
              id={ item.idMeal }
            />
            <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
          </div>
        );
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
              <label htmlFor="carouselExampleControls">
                Recomendações:
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {mapRecomm(recomm)}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </label>
              <button type="button" data-testid="start-recipe-btn">
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

export default DetalhesBebidas;
