import React, { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RecommendedCard from '../components/RecommendedCard';
import ShareFavoriteBtm from '../components/ShareFavoriteBtm';
import FetchContext from '../context/FetchContext';

function DetailsPage({ match: { path, params, url } }) {
  const { setTypeFunc } = useContext(FetchContext);
  const [details, setDetails] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const history = useHistory();
  const pageFoods = path.includes('comidas');
  const pageDrinks = path.includes('bebidas');
  const { id } = params;
  const urlFoods = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const buttonStyle = {
    position: 'fixed',
    right: 30,
    bottom: 0,
  };

  const fetchDetails = async () => {
    if (pageFoods) {
      setTypeFunc('meals');
      const response = await fetch(urlFoods);
      const dataResponse = await response.json();
      const food = dataResponse.meals[0];
      setDetails(food);
      const responseRecommendation = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const dataRecommendation = await responseRecommendation.json();
      setRecommendation(dataRecommendation);
    } if (pageDrinks) {
      setTypeFunc('drinks');
      const response = await fetch(urlDrinks);
      const dataResponse = await response.json();
      const drink = dataResponse.drinks[0];
      setDetails(drink);
      const responseRecommendation = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const dataRecommendation = await responseRecommendation.json();
      setRecommendation(dataRecommendation);
    }
  };

  const filterRecommendation = () => {
    if (recommendation) {
      const SIX_POSITION = 6;
      const recommended = recommendation.drinks || recommendation.meals;
      const newRecommendation = recommended.slice(0, SIX_POSITION);
      return newRecommendation
        .map((element, index) => (
          <Carousel.Item key={ index }>
            <RecommendedCard key={ index } recipe={ element } index={ index } />
          </Carousel.Item>
        ));
    }
  };

  const filterIngredients = () => {
    const chaves = Object.keys(details);
    const ingredients = chaves.filter((key) => key
      .includes('strIngredient') && details[key]);
    const measure = chaves.filter((key) => key.includes('strMeasure') && details[key]);
    return ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${details[ingredient]} - ${details[measure[index]]}`}
      </li>
    ));
  };

  const handleStartRecipeClick = () => {
    if (pageFoods) {
      return history.push(`/comidas/${id}/in-progress`);
    }
    if (pageDrinks) {
      return history.push(`/bebidas/${id}/in-progress`);
    }
  };

  const handleInstrutions = () => {
    const chaves = Object.keys(details);
    const instruction = chaves.filter((key) => key.includes('strInstructions'));
    return (
      <p data-testid="instructions">{details[instruction[0]]}</p>
    );
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ details.strMealThumb || details.strDrinkThumb }
          alt={ details.strMeal || details.strDrink }
        />
        <h2
          data-testid="recipe-title"
        >
          {details.strMeal || details.strDrink}
        </h2>
        <p
          data-testid="recipe-category"
        >
          {details.strCategory }
        </p>
        <p data-testid="recipe-category">
          {details.strAlcoholic}
        </p>
      </div>
      <ShareFavoriteBtm
        url={ url }
        pageFoods={ pageFoods }
        id={ id }
        data={ details }
        pageDrinks={ pageDrinks }
      />
      <div>
        <h3>
          Ingredientes
        </h3>
        <ul>
          {filterIngredients() }
        </ul>
      </div>
      <div>
        <h3>
          Instruções
        </h3>
        { handleInstrutions() }
      </div>
      <div>
        <ReactPlayer data-testid="video" url={ details.strYoutube } />
      </div>
      <div>
        <h3>
          Recomendações
        </h3>
        <Carousel>
          {filterRecommendation()}
        </Carousel>
      </div>
      <div>
        <Button
          variant="success"
          style={ buttonStyle }
          className="start-recipe"
          data-testid="start-recipe-btn"
          onClick={ () => handleStartRecipeClick() }
        >
          Iniciar Receita
        </Button>
      </div>
    </div>
  );
}

DetailsPage.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default DetailsPage;
