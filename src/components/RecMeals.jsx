import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { getFoodRecipes } from '../services';
import './css/recomendations.css';

const SIX = 6;

function RecMeals() {
  const [recFoods, setRecFoods] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(2);

  useEffect(() => {
    const fetchRecFoods = async () => {
      const meals = await getFoodRecipes();
      setRecFoods(meals.slice(0, SIX));
    };
    fetchRecFoods();
  }, []);

  const changeIndex = ({ target }) => {
    const { name } = target;
    const FOUR = 4;

    if (name === 'increase') {
      setIndexCarousel(indexCarousel + 2);
    }

    if (name === 'decrease') setIndexCarousel(indexCarousel - 2);

    if (indexCarousel > FOUR && name === 'increase') setIndexCarousel(2);

    if (indexCarousel <= 2 && name === 'decrease') setIndexCarousel(SIX);
  };

  const renderRecomendation = (index) => {
    const listCarousel = recFoods.map(({ strMealThumb, strMeal }, key) => (
      <div
        id="recomendationContainer"
        key={ key }
        data-testid={ `${key}-recomendation-card` }
        className="carousel--slide"
      >
        <img
          src={ strMealThumb }
          alt={ strMeal }
        />
        <h4
          id="recomendationTitle"
          data-testid={ `${index}-recomendation-title` }
        >
          {strMeal}
        </h4>
      </div>
    ));

    return (listCarousel.slice(index - 2, index));
  };

  return (
    <section className="carousel">
      <button
        type="button"
        name="decrease"
        onClick={ (event) => changeIndex(event) }
      >
        <GrPrevious />
      </button>
      <div className="carousel--slides">
        { renderRecomendation(indexCarousel) }
      </div>
      <button
        type="button"
        name="increase"
        onClick={ (event) => changeIndex(event) }
      >
        <GrNext />
      </button>
    </section>
  );
}

export default RecMeals;
