import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import CardRecomendation from '../components/CardRecomendation';
import VideoPlayer from '../components/VideoPlayer';
import { saveFavoriteRecipe } from '../storage/localStorage';
import '../styles/details.css';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { getDataById, getRandomData } from '../services/apiRequest';

const SIX = 6;

export default function Details() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { id } = useParams();

  const [domain, firstKey, imgSrc, title, recDomain, recFirstKey] = path
    .includes('comidas')
    ? ['themealdb', 'meals', 'strMealThumb', 'strMeal', 'thecocktaildb', 'drinks']
    : ['thecocktaildb', 'drinks', 'strDrinkThumb', 'strDrink', 'themealdb', 'meals'];

  const [singleContent, setSingleContent] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);
  const [recomendations, setRecomentation] = useState([]);
  const [favorit, setFavorit] = useState({ status: false, imagem: whiteHeartIcon });

  useEffect(() => {
    async function getRecipeDetails() {
      getDataById(domain, id).then((res) => {
        setSingleContent(res[firstKey] || []);

        const list = Object.entries(res[firstKey][0]).filter((el) => (
          (el[0].includes('Ingredient')
          || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');
        setIngridientsList(list);
      });

      getRandomData(recDomain).then((res) => setRecomentation(res[recFirstKey]
        .filter((_e, index) => index < SIX)));
    }
    getRecipeDetails();
  }, [id, domain, firstKey, recDomain, recFirstKey]);

  function handleIngredientsData() {
    const ingredientFormated = ingredientsList.map((el, i, arr) => (
      (el[0].includes('Ingredient')) && ([`${el[1]
        + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
          .map((result) => (` - ${result[1]}`))}`,
      ]))).filter((fil) => fil);
    return ingredientFormated;
  }

  function handleFavorite() {
    setFavorit({ status: !favorit.status,
      imagem: favorit.imagem === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon });
    saveFavoriteRecipe(path, singleContent[0]);
    // saveFavoritRecipes(path, singleContent[0], favorit.status);
  }

  function handleRecipeInProgress() {
    history.push(`${path.replace(':id', `${id}`)}/in-progress`);
  }

  if (!singleContent[0]) return <h1>Loading...</h1>;
  if (singleContent[0] && recomendations) {
    const { strAlcoholic, strCategory, strInstructions, strYoutube } = singleContent[0];
    const { imagem } = favorit;
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ singleContent[0][imgSrc] }
          alt={ singleContent[0][title] }
          width="200px"
        />
        <div className="recipe-heading-container">
          <div className="info-heading">
            <h3 data-testid="recipe-title">{singleContent[0][title]}</h3>
            <p data-testid="recipe-category">
              {
                firstKey === 'drinks'
                  ? strAlcoholic
                  : strCategory
              }
            </p>
          </div>
          <Button>
            <img data-testid="share-btn" src={ shareIcon } alt="" />
          </Button>
          <Button onClick={ handleFavorite }>
            <img data-testid="favorite-btn" src={ imagem } alt="" />
          </Button>
        </div>
        <div className="ingredients-container">
          <h4>
            Ingredients
          </h4>
          {handleIngredientsData().map((string, i) => (
            <div key={ i }>
              <p data-testid={ `${i}-ingredient-name-and-measure` }>
                { string }
              </p>
            </div>
          ))}
        </div>
        <div className="instructions-video-container">
          <p data-testid="instructions">
            {strInstructions}
          </p>
          { path.includes('/comidas') && (
            <VideoPlayer
              testID="video"
              videoLink={ strYoutube }
              recipeTitle={ singleContent[0][title] }
            />
          ) }
        </div>
        <Carousel>
          { recomendations.map((item, i) => (
            <Carousel.Item
              className="recomendations-container"
              key={ i }
            >
              <CardRecomendation
                mealOrDrink={ item }
                index={ i }
                testId="recomendation"
              />

              {/* <CardRecomendation
                mealOrDrink={ array[i + 1] || array[0] }
                index={ i + 1 }
                testId="recomendation"
              /> */}
            </Carousel.Item>
          ))}
        </Carousel>

        <Button
          className="start-recipe-btn"
          onClick={ handleRecipeInProgress }
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </Button>
      </>
    );
  }
}
