import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/contextRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendedFood from './RecommendedFood';
import './DetailsPage.css';
import '../App.css';

function InProgressDrink({ match: { params } }) {
  const { drinks, setDrinks, setIsLoading } = useContext(ContextRecipes);
  const [checked, setchecked] = useState({});
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((results) => setDrinks(results.drinks))
        .then(() => setIsLoading(false));
    };
    getRecipes();
  }, [id, setDrinks, setIsLoading]);

  if (drinks[0] === undefined) return <h1>Carregando...</h1>;

  const listIngredients = Object.entries(drinks[0])
    .filter((recipe) => recipe[0].includes('Ingredient') && recipe[1]);

  const ingredientsFinal = listIngredients.map((valor) => valor[1]);

  const listMeasures = Object.entries(drinks[0])
    .filter((recipe) => recipe[0].includes('Measure') && recipe[1]);

  const measuresFinal = listMeasures.map((valor) => valor[1]);

  /* const INDEX_NUMBER = 3;
  const urlVideo = drinks[0].strYoutube.split('/');
  urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  // urlVideo.forEach((u) => u.inclued)
  const urlVideo2 = drinks[0].strYoutube.split('/');
  const partUrl = urlVideo2[3].split('?');
  const partUrl2 = partUrl[1].split('=');
  partUrl2.shift();
  let fullUrl = '';

  partUrl[0] = 'embed';
  urlVideo.push(partUrl[0]);
  urlVideo.push(partUrl2);
  fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;
  // // }, [setRecipes, id]); */

  return (
    <section>
      <img
        src={ drinks[0].strDrinkThumb }
        alt={ drinks[0].strDrink }
        width="250px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{drinks[0] && drinks[0].strDrink }</p>
      <img src={ shareIcon } alt="Share" data-testid="share-btn" />
      <img src={ whiteHeartIcon } alt="Share" data-testid="favorite-btn" />
      <p data-testid="recipe-category">{ drinks[0].strAlcoholic }</p>
      <h3>Ingredientes</h3>
      { ingredientsFinal
        .map((ing, i) => ((
          <label
            htmlFor={ ing }
            key={ ing }
            className={ (checked[ing] === true) ? 'checked' : 'nada' }
            data-testid={ `${i}-ingredient-step` }
          >
            { ing }
            {' '}
            -
            { ' ' }
            { measuresFinal.map((mea, ind) => i === ind && (mea)) }
            <input
              id={ ing }
              type="checkbox"
              checked={ checked[ing] }
              onClick={ () => setchecked({ ...checked, [ing]: !checked[ing] }) }
            />
          </label>
        ))) }
      <h3>Instruções</h3>
      <p data-testid="instructions">{ drinks[0].strInstructions }</p>
      {/* <iframe
        width="560"
        height="315"
        src={ fullUrl }
        title="YouTube video player"
        data-testid="video"
      /> */}
      <h3>Recomendadas</h3>
      <RecommendedFood />
      <Link to=" ">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="button"
        >
          Finalizar Receita
        </button>
      </Link>
    </section>);
}

InProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default InProgressDrink;
