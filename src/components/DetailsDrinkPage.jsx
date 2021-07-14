import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import AllTagsFromDetailsDrinks from './AllTagsFromDetailsDrinks';

function DetailsDrinkPage({ match: { params } }) {
  const { drinks, setDrinks, isLoading,
    setIsLoading, logicFromDetailsDrink } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((results) => setDrinks(results.drinks))
        .then(() => setIsLoading(false));
    };
    getRecipes();
  }, [setDrinks, id, setIsLoading, logicFromDetailsDrink]);
  // console.log(id, drinks);

  // let ingredientsFinal = [];
  // let measuresFinal = [];
  // // let fullUrl = '';

  // if (drinks) {
  //   const listIngredients = Object.keys(drinks[0])
  //     .filter((drink) => drink.includes('Ingredient'));
  //   const ingredients = [];
  //   const drinksKeys = Object.keys(drinks[0]);
  //   for (let j = 0; j < drinksKeys.length; j += 1) {
  //     for (let i = 0; i < listIngredients.length; i += 1) {
  //       if (drinksKeys[j] === listIngredients[i]) {
  //         ingredients.push(drinks[0][drinksKeys[j]]);
  //       }
  //     }
  //   }

  //   ingredientsFinal = ingredients.filter((ing) => ing !== null);

  //   const listMeasures = Object.keys(drinks[0])
  //     .filter((drink) => drink.includes('Measure'));
  //   const measures = [];
  //   const measure = Object.keys(drinks[0]);
  //   for (let j = 0; j < measure.length; j += 1) {
  //     for (let i = 0; i < listMeasures.length; i += 1) {
  //       if (measure[j] === listMeasures[i]) {
  //         measures.push(drinks[0][measure[j]]);
  //       }
  //     }
  //   }

  //   measuresFinal = measures.filter((ing) => ing !== ' ');

  //   // const INDEX_NUMBER = 3;
  //   // const urlVideo = drinks[0].strVideo.split('/');
  //   // urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  //   // // urlVideo.forEach((u) => u.inclued)
  //   // const urlVideo2 = drinks[0].strVideo.split('/');
  //   // const partUrl = urlVideo2[3].split('?');
  //   // const partUrl2 = partUrl[1].split('=');
  //   // partUrl2.shift();
  //   // console.log(partUrl2);

  //   // partUrl[0] = 'embed';
  //   // urlVideo.push(partUrl[0]);
  //   // urlVideo.push(partUrl2);
  //   // fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;
  // }

  return (
    isLoading === true || !drinks || drinks.length === 0 ? <p>Carregando...</p>
      : (
        <section>
          <img
            src={ drinks[0].strDrinkThumb }
            alt={ drinks[0].strDrink }
            width="250px"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ drinks[0] && drinks[0].strDrink }</p>
          <img src={ shareIcon } alt="Share" data-testid="share-btn" />
          <img src={ whiteHeartIcon } alt="Share" data-testid="favorite-btn" />
          <p data-testid="recipe-category">{ drinks[0].strAlcoholic }</p>
          <h3>Ingredientes</h3>
          {/* <ul>
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
          {/* <p data-testid="instructions">{ drinks[0].strInstructions }</p> */}
          <h3>Recomendadas</h3>
          {' '}
          */
          <button type="button" data-testid="start-recipe-btn">Iniciar</button>
        </section>)
  );
}

DetailsDrinkPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsDrinkPage;
