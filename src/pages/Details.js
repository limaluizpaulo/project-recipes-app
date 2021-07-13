import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Card from '../components/Card';
import VideoPlayer from '../components/VideoPlayer';
import { saveFavoriteRecipe } from '../storage/localStorage';
import '../styles/details.css';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { getDataById, getRandomData } from '../services/apiRequest';

const SIX = 6;

function handleIngredientsData(Lista) {
  const ingredientFormated = Lista.map((el, i, arr) => (
    (el[0].includes('Ingredient')) && ([`${el[1]
      + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
        .map((result) => (` - ${result[1]}`))}`,
    ]))).filter((fil) => fil);
  return ingredientFormated;
}

function handleRecipeInProgress(history, path, id) {
  history.push(`${path.replace(':id', `${id}`)}/in-progress`);
}

function handleFavorite(state, setState, path, content) {
  setState((prevState) => ({ status: !state.status,
    imagem: prevState.imagem === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon }));
  saveFavoriteRecipe(path, content);
  // saveFavoritRecipes(path, singleContent[0], favorit.status);
}

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
    getDataById(domain, id).then((res) => {
      setSingleContent(res[firstKey] || []);

      const list = Object.entries(res[firstKey][0]).filter((el) => (
        (el[0].includes('Ingredient')
          || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');
      setIngridientsList(list);
    });

    getRandomData(recDomain).then((res) => setRecomentation(res[recFirstKey]
      .filter((_e, index) => index < SIX)));
  }, [id, domain, firstKey, recDomain, recFirstKey]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const arrayFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorit({
        status: arrayFavorit.find((el) => el.id === id),
        imagem: arrayFavorit.find((el) => el.id === id)
          ? blackHeartIcon : whiteHeartIcon });
    }
  }, [id]);

  return (
    !singleContent[0] ? (<h1>Loading...</h1>)
      : (
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
                    ? singleContent[0].strAlcoholic
                    : singleContent[0].strCategory
                }
              </p>
            </div>
            <Button>
              <img data-testid="share-btn" src={ shareIcon } alt="Favorit" />
            </Button>
            <Button
              onClick={
                () => handleFavorite(favorit, setFavorit, path, singleContent[0])
              }
            >
              <img
                data-testid="favorite-btn"
                src={ favorit.imagem }
                alt=""
              />
            </Button>
          </div>
          <div className="ingredients-container">
            <h4>
              Ingredients
            </h4>
            {handleIngredientsData(ingredientsList).map((string, i) => (
              <div key={ i }>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  { string }
                </p>
              </div>
            ))}
          </div>
          <div className="instructions-video-container">
            <p data-testid="instructions">
              {singleContent[0].strInstructions}
            </p>
            { path.includes('/comidas') && (
              <VideoPlayer
                testID="video"
                videoLink={ singleContent[0].strYoutube }
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
                <Card
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
            onClick={ () => handleRecipeInProgress(history, path, id) }
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </Button>
        </>)
  );
}
