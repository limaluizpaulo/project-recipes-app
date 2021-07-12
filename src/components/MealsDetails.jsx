import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { fetchIdMeals } from '../Service/foodApi';
import { fetchAllDrinks } from '../Service/drinkApi';

import ShareButton from './ShareButton';
import RecipesContext from '../Context/RecipesContext';
import FavoriteButton from './FavoriteButton';

export default function MealsDetails() {
  const {
    stateMeals,
    setStateMeals,
    ingredientsMeals,
    setIngredientsMeals,
    measureMeals,
    setMeasureMeals,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [drinksAll, setDrinksAll] = useState([{ strDrink: '' }]);
  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const [invisibleButton, setInvisibleButton] = useState(false);
  const [stateChangeButton, setStateChangeButton] = useState(false);
  // const [setChekButtonState] = useState(true);

  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateMeals[0]);
    const arrayKeysIngredients = keysIngredientes
      .filter((e) => e.includes('strIngredient'));
    const ingredient = [];
    const measures = [];

    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateMeals[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateMeals[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== '');
    const filtroMeasure = measures.filter((word) => word !== ' ');
    setIngredientsMeals(filtroIngredients);
    setMeasureMeals(filtroMeasure);
  };

  const getApiDetails = () => {
    const SIX = 6;
    const id = pathname.split('/')[2];
    fetchIdMeals(id).then((result) => setStateMeals(result));
    fetchAllDrinks().then((result) => setDrinksAll(result.filter((_e, i) => i < SIX)));
  };

  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateMeals]);

  const id = pathname.split('/')[2];
  const removeFavorited = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.filter(
        (element) => element.id !== id,
      );
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(filterLocalStorage),
      );
    }
  };

  const verifyHeart = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.some((element) => element.id === id);
      if (filterLocalStorage) {
        setStateChangeHeart(false);
      }
    }
  };

  useEffect(verifyHeart, []);

  const checkButton = () => {
    const recipeFinish = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeFinish) {
      const buttonInvisible = recipeFinish.some((element) => element.id === id);
      setInvisibleButton(buttonInvisible);
    }
  };
  useEffect(checkButton, []);
  const changeButton = () => {
    const modButton = JSON.parse(localStorage.getItem(`${id}`));
    if (modButton) {
      setStateChangeButton(true);
    }
  };
  useEffect(changeButton, []);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strVideo,
    idMeal,
  } = stateMeals[0];

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="foto da comida"
        data-testid="recipe-photo"
        width="100px"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <ShareButton />
      <FavoriteButton
        stateChangeHeart={ stateChangeHeart }
        setStateChangeHeart={ setStateChangeHeart }
        removeFavorited={ removeFavorited }
      />
      <p data-testid="recipe-category">{strCategory}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsMeals.map((ingredient, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {`${ingredient} ${
              measureMeals[index] !== undefined ? `-${measureMeals[index]}` : ''
            }`}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ strVideo }
        title="video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-pict"
      />
      <Carousel>
        {drinksAll.map((drink, index) => (
          <Carousel.Item
            interval={ 1000 }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-60"
              src={ drink.strDrinkThumb }
              alt="slide"
            />
            <Carousel.Caption data-testid={ `${index}-recomendation-title` }>
              <h3>{drink.strDrink}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Link to={ `/comidas/${idMeal}/in-progress` }>

        <button
          type="button"
          data-testid="start-recipe-btn"
          className={ invisibleButton ? 'iniciarReceitaInvisible' : 'iniciarReceita' }
        >
          {stateChangeButton ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
        )
      </Link>
    </div>
  );
}
