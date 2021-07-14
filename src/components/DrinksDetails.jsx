import React, { useEffect, useState, useContext } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { fetchIdDrink } from '../Service/drinkApi';
import { fetchAllMeals } from '../Service/foodApi';

import ShareButton from './ShareButton';
import RecipesContext from '../Context/RecipesContext';
import FavoriteButton from './FavoriteButton';

export default function DrinksDetails() {
  const [mealsAll, setMealsAll] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { stateDrink, setStateDrink } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const [checkButtonstate, setChekButtonState] = useState(false);

  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateDrink[0]);
    const arrayKeysIngredients = keysIngredientes
      .filter((e) => e.includes('strIngredient'));
    const ingredient = [];
    const measures = [];
    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateDrink[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateDrink[0][element]));
    const filtroIngredients = ingredient.filter((word) => word !== null);
    const filtroMeasure = measures.filter((word) => word !== null);
    setIngredients(filtroIngredients);
    setMeasure(filtroMeasure);
  };

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

  const getApiDetails = () => {
    const SIX = 6;
    fetchIdDrink(id).then((result) => setStateDrink(result));
    fetchAllMeals().then((result) => setMealsAll(result.filter((_e, i) => i < SIX)));
  };
  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateDrink]);
  const { strDrinkThumb, strDrink, strInstructions,
    strAlcoholic, idDrink } = stateDrink[0];
  const checkButton = () => {
    const url = pathname.split('/')[2];
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes') || ('{}'));
    const keysCocktais = cocktails ? Object.keys(cocktails) : [];
    const checkKeys = keysCocktais.includes(url);
    setChekButtonState(checkKeys);
  };
  useEffect(checkButton, []);
  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
        width="250px"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <div className="favorite-share">
        <ShareButton />
        <FavoriteButton
          stateChangeHeart={ stateChangeHeart }
          setStateChangeHeart={ setStateChangeHeart }
          removeFavorited={ removeFavorited }
        />
      </div>
      <h5 data-testid="recipe-category">{strAlcoholic}</h5>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            {`${ingredient} ${
              measure[index] !== undefined ? `-${measure[index]}` : ''
            }`}
          </li>
        ))}
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions" className="instrucoesP">{strInstructions}</p>
      <Carousel>
        {mealsAll.map((meals, index) => (
          <Carousel.Item
            interval={ 850 }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-60"
              src={ meals.strMealThumb }
              alt="slide"
            />
            <Carousel.Caption data-testid={ `${index}-recomendation-title` }>
              <h3>{meals.strMeal}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Link to={ `/bebidas/${idDrink}/in-progress` }>
        <Button
          type="button"
          data-testid="start-recipe-btn"
          className="iniciarReceita"
          variant="danger"
        >
          {checkButtonstate ? 'Continuar Receita' : 'Iniciar Receita' }
        </Button>
        )
      </Link>
    </div>
  );
}
