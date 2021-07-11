import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function Recomendations({ strMeal }) {
  const { mealsFiltered } = useMealsContext();
  const { drinksFiltered } = useDrinksContext();
  const SIX = 6;
  const arrRecomendations = (strMeal && drinksFiltered.slice(0, SIX))
  || mealsFiltered.slice(0, SIX);

  // CAROUSEL BASED ON: https://react-bootstrap.github.io/components/carousel/
  return (
    <div className="recomendations">
      <Carousel className="carousel">
        {arrRecomendations.map((recipe, index) => (
          <Carousel.Item
            key={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              src={ strMeal ? recipe.strDrinkThumb : recipe.strMealThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />

            <Carousel.Caption>
              <p>
                {recipe.strAlcoholic || recipe.strCategory}
              </p>
              <p data-testid={ `${index}-recomendation-title` }>
                { recipe.strMeal || recipe.strDrink }
              </p>
            </Carousel.Caption>

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

Recomendations.defaultProps = {
  strMeal: null,
};
Recomendations.propTypes = {
  strMeal: PropTypes.string,
};
