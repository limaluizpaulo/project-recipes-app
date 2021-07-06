import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { fetchIdMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

export default function MealsDetails() {
  const [stateMeals, setStateMeals] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { pathname } = useLocation();
  const { resposeApiLupaDrink } = useContext(RecipesContext);

  const filterDetails = () => {
    const keysIngredientes = Object.keys(stateMeals[0]);
    const arrayKeysIngredients = keysIngredientes.filter(
      (e) => e.includes('strIngredient'),
    );
    const ingredient = [];
    const measures = [];
    const arrayKeysMeasure = keysIngredientes.filter((e) => e.includes('strMeasure'));
    arrayKeysMeasure.forEach((element) => measures.push(stateMeals[0][element]));
    arrayKeysIngredients.forEach((element) => ingredient.push(stateMeals[0][element]));

    setIngredients(ingredients.filter((e) => e !== null));
    setMeasure(measure.filter((e) => e !== null));
  };

  const getApiDetails = () => {
    const id = pathname.split('/')[2];
    fetchIdMeals(id).then((result) => setStateMeals(result));
  };

  useEffect(getApiDetails, []);
  useEffect(filterDetails, [stateMeals]);
  const { strMealThumb, strMeal,
    strCategory, strInstructions, strVideo } = stateMeals[0];
  return (
    <div>
      <img src={ strMealThumb } alt="foto da comida" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <button type="button">
        <img
          src="../images/shareIcon.svg"
          alt="imagem de compartilhamento"
          data-testid="share-btn"
        />
      </button>
      <button type="button">
        <img
          src="../images/whiteHeartIcon.svg"
          alt="imagem de favoritar"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((e, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ e }
          >
            { e }
          </li>))}
        {measure.map((measur, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ measur }
          >
            { measur }
          </li>))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{ strInstructions }</p>
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
        <Carousel.Item interval={ 1000 }>
          <img
            className="d-block w-100"
            src=""
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={ 500 }>
          <img
            className="d-block w-100"
            src=""
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src=""
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* slide de receitas recomendadas de drinks
       com data-testid="${index}-recomendation-card" */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}
