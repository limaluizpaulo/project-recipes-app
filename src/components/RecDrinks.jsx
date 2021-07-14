import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { getDrinkRecipes } from '../services';
import './css/recomendations.css';

const SIX = 6;

function RecDrinks() {
  const [recDrinks, setRecDrinks] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(2);

  useEffect(() => {
    const fetchRecDrinks = async () => {
      const drink = await getDrinkRecipes();
      setRecDrinks(drink.slice(0, SIX));
    };
    fetchRecDrinks();
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
    const listCarousel = recDrinks.map(({ strDrinkThumb, strDrink }, key) => (
      <div
        id="recomendationContainer"
        key={ key }
        data-testid={ `${key}-recomendation-card` }
        className="carousel--slide"
      >
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <h4
          id="recomendationTitle"
          data-testid={ `${index}-recomendation-title` }
        >
          {strDrink}
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

export default RecDrinks;
