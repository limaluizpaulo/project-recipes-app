import React, { useEffect, useState, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
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
  const [colorHeart, setColorHeart] = useState(false);
  const { stateDrink, setStateDrink } = useContext(RecipesContext);
  const { pathname } = useLocation();

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
  const changeHeart = () => {
    setColorHeart(!colorHeart);
  };

  const getApiDetails = () => {
    const SIX = 6;
    const id = pathname.split('/')[2];
    fetchIdDrink(id).then((result) => setStateDrink(result));
    fetchAllMeals().then((result) => setMealsAll(result.filter((_e, i) => i < SIX)));
  };
  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateDrink]);
  const { strDrinkThumb, strDrink,
    strInstructions, strAlcoholic, idDrink,

  } = stateDrink[0];
  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
        width="100px"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>

      <ShareButton />
      <FavoriteButton />
      <p data-testid="recipe-category">
        {
          strAlcoholic
        }
      </p>
      <h2>Ingredientes</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { `${ingredient} ${measure[index] !== undefined ? `-${measure[index]}` : ''}`}
          </li>))}
      </ul>
      <h2>Instruções</h2>
      <p data-testid="instructions">
        {strInstructions}
      </p>
      <Carousel>
        {mealsAll.map((meals, index) => (
          <Carousel.Item
            interval={ 1000 }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-60"
              src={ meals.strMealThumb }
              alt="slide"
              width="100px"

            />
            <Carousel.Caption data-testid={ `${index}-recomendation-title` }>
              <h3>{meals.strMeal}</h3>
            </Carousel.Caption>
          </Carousel.Item>))}
      </Carousel>
      <Link to={ `/bebidas/${idDrink}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="iniciarReceita"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}
