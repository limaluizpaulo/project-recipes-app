import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import shareIcon from '../images/shareIcon.svg';

export default function CardRecipesDone({ mealOrDrink, index }) {
  return (
    <section data-testid={ `${index}-horizontal-card` }>
      <p>{mealOrDrink.id}</p>
      <p>{mealOrDrink.type}</p>
      <p>{mealOrDrink.area}</p>
      <p>{mealOrDrink.alcoholicOrNot}</p>
      <img
        width="150px"
        data-testid={ `${index}-horizontal-image` }
        src={ mealOrDrink.image }
        alt={ mealOrDrink.name }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{mealOrDrink.category}</p>
      <p data-testid={ `${index}-horizontal-top-name` }>{mealOrDrink.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{mealOrDrink.doneDate}</p>
      <Button>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ mealOrDrink.name }
        />
      </Button>
      <p
        data-testid={ `${index}-${mealOrDrink.tags}-horizontal-tag` }
      >
        {mealOrDrink.tags}
      </p>
    </section>
  );
}

CardRecipesDone.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};
