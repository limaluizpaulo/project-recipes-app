import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ mealOrDrink, index, testId }) {
  const { path } = useRouteMatch();
  const [imgSrcKey, titleKey] = path.includes('comidas')
    ? [mealOrDrink.strMealThumb, mealOrDrink.strMeal]
    : [mealOrDrink.strDrinkThumb, mealOrDrink.strDrink];

  return (
    <section data-testid={ `${index}-${testId}-card` }>
      <img
        width="150px"
        data-testid={ `${index}-card-img` }
        src={ imgSrcKey }
        alt={ titleKey }
      />
      <h3
        data-testid={ (testId === 'recipe') ? `${index}-card-name`
          : `${index}-recomendation-title` }
      >
        {titleKey}
      </h3>
    </section>
  );
}

Card.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};
