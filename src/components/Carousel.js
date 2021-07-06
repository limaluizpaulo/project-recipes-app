import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/Provider';

const Carousel = ({ food }) => {
  const magic = 6;
  const { meals, drinks } = useContext(GlobalContext);
  const recipes = food ? drinks.slice(0, magic) : meals.slice(0, magic);
  return (
    <div className="card-carousel">
      {recipes.length && recipes.map((recipe, idx) => {
        const { strMealThumb, strMeal } = recipe;
        const { strDrinkThumb, strDrink } = recipe;
        return (
          <div
            key={ `carousel - ${idx}` }
            className="recomendation-card"
            data-testid={ `${idx}-recomendation-card` }
          >
            <p data-testid={ `${idx}-recomendation-title` }>
              { strMeal || strDrink}
            </p>
            <img
              src={ strMealThumb || strDrinkThumb }
              alt="Second slide"
            />
          </div>
        );
      })}
    </div>
  );
};

Carousel.defaultProps = {
  food: false,
};

Carousel.propTypes = {

  food: PropTypes.bool,
};

export default Carousel;
