import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import requestMeal, { requestDrinkById } from '../../helpers/requests';
import renderIngredients from './renderIngredients';
import startButton from './startButton';
import './Detalhes.css';
import ButtonFavorite from '../../components/ButtonFavorite/ButtonFavorite';
import ButtonShare from '../../components/ButtonShare/ButtonShare';

function DetalhesBebidas({ match }) {
  const [data, setData] = useState([]);
  const [recomm, setRecomm] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  function renderButtons(item) {
    const DrinkToFav = data.drinks[0];
    const favoriteRecipes = {
      id: DrinkToFav.idDrink,
      type: 'bebidas',
      area: '',
      category: DrinkToFav.strCategory,
      alcoholicOrNot: DrinkToFav.strAlcoholic,
      name: DrinkToFav.strDrink,
      image: DrinkToFav.strDrinkThumb,
    };

    return (
      <>
        <ButtonShare
          path={ `http://localhost:3000${pathToCopy}` }
          dataTest="share-btn"
        />

        <ButtonFavorite
          id={ item.idDrink }
          favoriteRecipes={ favoriteRecipes }
          dataTest="favorite-btn"
        />
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
            <div className="d-flex carousel-item active" key={ index }>
              <div
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
      .map((item, index) => {
        const path = `/bebidas/${item.idDrink}`;
        if (path === history.location.pathname) {
          return (
            <div key={ index }>
              <img
                className="image-food"
                src={ item.strDrinkThumb }
                data-testid="recipe-photo"
                alt={ item.strDrink }
              />
              <h3 data-testid="recipe-title">{item.strDrink}</h3>
              {renderButtons(item)}
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
              {startButton('bebidas', item, history)}
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

DetalhesBebidas.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetalhesBebidas;
