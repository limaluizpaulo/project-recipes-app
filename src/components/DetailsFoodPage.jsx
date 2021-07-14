import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendedDrinks from './RecommendedDrinks';
import './DetailsPage.css';

function DetailsFoodPage({ match: { params } }) {
  // const [recipesFood, setRecipesFood] = useState([]);
  const { recipes, setRecipes } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((results) => setRecipes(results.meals));
    };
    getRecipes();
  }, [id, setRecipes]);

  console.log(recipes, id);
  if (recipes[0] === undefined) return <h1>Loading...</h1>;
  const listIngredients = Object.keys(recipes[0])
    .filter((recipe) => recipe.includes('Ingredient'));
  const ingredients = [];
  const recep = Object.keys(recipes[0]);
  for (let j = 0; j < recep.length; j += 1) {
    for (let i = 0; i < listIngredients.length; i += 1) {
      if (recep[j] === listIngredients[i]) {
        ingredients.push(recipes[0][recep[j]]);
      }
    }
  }

  const ingredientsFinal = ingredients.filter((ing) => ing !== '');

  const listMeasures = Object.keys(recipes[0])
    .filter((recipe) => recipe.includes('Measure'));
  const measures = [];
  const measure = Object.keys(recipes[0]);
  for (let j = 0; j < measure.length; j += 1) {
    for (let i = 0; i < listMeasures.length; i += 1) {
      if (measure[j] === listMeasures[i]) {
        measures.push(recipes[0][measure[j]]);
      }
    }
  }

  const measuresFinal = measures.filter((ing) => ing !== ' ');

  const INDEX_NUMBER = 3;
  const urlVideo = recipes[0].strYoutube.split('/');
  urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  console.log(recipes[0]);
  // urlVideo.forEach((u) => u.inclued)
  const urlVideo2 = recipes[0].strYoutube.split('/');
  const partUrl = urlVideo2[3].split('?');
  const partUrl2 = partUrl[1].split('=');
  partUrl2.shift();
  console.log(partUrl2);
  let fullUrl = '';

  partUrl[0] = 'embed';
  urlVideo.push(partUrl[0]);
  urlVideo.push(partUrl2);
  fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;
  // // }, [setRecipes, id]);
  // // console.log(id, recipes);

  return (
    <section>
      <img
        src={ recipes[0].strMealThumb }
        alt={ recipes[0].strMeal }
        width="250px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ recipes[0] && recipes[0].strMeal }</p>
      <img src={ shareIcon } alt="Share" data-testid="share-btn" />
      <img src={ whiteHeartIcon } alt="Share" data-testid="favorite-btn" />
      <p data-testid="recipe-category">{ recipes[0].strCategory }</p>
      <h3>Ingredientes</h3>
      <ul>
        { ingredientsFinal
          .map((ing, i) => ((
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              { ing }
              {' '}
              -
              { ' ' }
              { measuresFinal.map((mea, ind) => i === ind && (mea)) }
            </li>
          ))) }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipes[0].strInstructions }</p>
      <iframe
        width="560"
        height="315"
        src={ fullUrl }
        title="YouTube video player"
        data-testid="video"
      />
      <h3>Recomendadas</h3>
      <RecommendedDrinks />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="button"
      >
        Iniciar Receita
      </button>
    </section>);
}

DetailsFoodPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsFoodPage;
