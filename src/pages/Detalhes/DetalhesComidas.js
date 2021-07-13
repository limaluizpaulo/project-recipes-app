import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestDrink, requestMealById } from '../../helpers/requests';
import renderIngredients from './renderIngredients';
import startButton from './startButton';
import './Detalhes.css';
import ButtonFavorite from '../../components/ButtonFavorite/ButtonFavorite';
import ButtonShare from '../../components/ButtonShare/ButtonShare';

function DetalhesComidas({ match }) {
  const [data, setData] = useState([]);
  const [recomm, setRecomm] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const pathToCopy = history.location.pathname;
  const { id } = match.params;

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestMealById(id);
      const resolveRecomm = await requestDrink();
      setData(resolve);
      setRecomm(resolveRecomm);
      setLoading(false);
    }());
  }, [id]);

  function renderButtons(item) {
    const mealToFav = data.meals[0];
    const favoriteRecipes = {
      id: mealToFav.idMeal,
      type: 'comidas',
      area: mealToFav.strArea,
      category: mealToFav.strCategory,
      alcoholicOrNot: '',
      name: mealToFav.strMeal,
      image: mealToFav.strMealThumb,
    };

    return (
      <>
        <ButtonShare
          path={ `http://localhost:3000${pathToCopy}` }
          dataTest="share-btn"
        />

        <ButtonFavorite
          id={ item.idMeal }
          favoriteRecipes={ favoriteRecipes }
          dataTest="favorite-btn"
        />
      </>
    );
  }

  function mapRecomm(param) {
    const { drinks } = param;
    const magicNumber = 6;
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => {
        if (index === 0) {
          return (
            <div className="d-flex carousel-item active" key={ index }>
              <div
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  className="d-flex w-100"
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
                  alt={ `imagem de ${item}` }
                  id={ item.idDrink }
                />
                <p data-testid={ `${index}-recomendation-title` }>{item.strDrink}</p>
              </div>
              <div
                data-testid={ `${index + 1}-recomendation-card` }
              >
                <img
                  className="d-flex w-100"
                  data-testid={ `${index + 1}-card-img` }
                  src={ drinks[index + 1].strDrinkThumb }
                  alt={ `imagem de ${drinks[index + 1]}` }
                  id={ drinks[index + 1].idDrink }
                />
                <p
                  data-testid={ `${index + 1}-recomendation-title` }
                >
                  {drinks[index + 1].strDrink}
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
                src={ item.strDrinkThumb }
                alt={ `imagem de ${item}` }
                id={ item.idDrink }
              />
              <p data-testid={ `${index}-recomendation-title` }>{item.strDrink}</p>
            </div>
          );
        }
        return null;
      });
  }

  function mapData(param) {
    const { meals } = param;
    return meals
      .map((item, index) => {
        const path = `/comidas/${item.idMeal}`;
        if (path === history.location.pathname) {
          return (
            <div key={ index }>
              <img
                className="image-food"
                src={ item.strMealThumb }
                data-testid="recipe-photo"
                alt={ item.strMeal }
              />
              <h3 data-testid="recipe-title">{item.strMeal}</h3>
              {renderButtons(item)}
              <h5 data-testid="recipe-category">{item.strCategory}</h5>
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
              <embed />
              <video id="video" data-testid="video" src={ item.strYoutube }>
                <track kind="captions" />
              </video>
              <p>Recomendações:</p>
              <div
                id="carouselExampleControlsNoTouching"
                className="carousel slide"
                data-bs-touch="false"
                data-bs-interval="false"
              >
                <div className="carousel-inner" />
                {mapRecomm(recomm)}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControlsNoTouching"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControlsNoTouching"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              { startButton('comidas', item, history) }
            </div>
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

//  Fonte Proptypes: https://stackoverflow.com/questions/47311310/proptypes-isrequired-on-react-router-4-params-prop
DetalhesComidas.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetalhesComidas;
