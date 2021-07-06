import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails({ match: { params: { id } } }) {
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    recomendationsDrinks,
  } = useContext(Context);

  let IngredientsAndMeasures = {};
  // if (details.meals && recomendationsDrinks) {
  //   IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
  //   const a = recomendationsDrinks.slice(0, 5);
  //   console.log(a);
  // }

  useEffect(() => {
    if (!details.meals) {
      detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [details.meals, detailsSyncSetState, id]);

  function loopIngredientsAndMeasure() {
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      mealArray.map((_a, index) => (
        <section key={ `ingredientAndMeasure${index + 1}` }>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          </div>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </div>
        </section>
      ))
    );
  }

  const loopRecomendationsDrinks = () => (
    recomendationsDrinks.map((eachDrink, index) => (
      <div
        key={ index }
        data-testid={ `${index}-recomendation-card` }
      >
        <h3 data-testid={ `${index}-recomendation-title` }>

          Teste
        </h3>
      </div>
    ))
  );

  if (details.meals && recomendationsDrinks) {
    const {
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = details.meals[0];
    IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const a = recomendationsDrinks.slice(0, 5);
    console.log(a);
    return (
      <main>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Meal" width="200px" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="Share" />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <span data-testid="instructions">{strInstructions}</span>
        {loopIngredientsAndMeasure()}
        {loopRecomendationsDrinks()}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <button type="button" data-testid="start-recipe-btn">
          Começar
        </button>
        <Carousel activeIndex="2">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
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
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  // details: PropTypes.shape().isRequired,
};

export default FoodDetails;

// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
