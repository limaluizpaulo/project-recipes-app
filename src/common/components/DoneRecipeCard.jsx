import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCard({ recipe, index }) { // Desestruturação de props
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  const mealInfo = () => (
    <p
      className="doneCategory"
      data-testid={ `${index}-horizontal-top-text` }
    >
      {`${area} - ${category}`}
    </p>
  );

  const drinkInfo = () => (
    <p
      className="doneCategory"
      data-testid={ `${index}-horizontal-top-text` }
    >
      {`${alcoholicOrNot}`}
    </p>
  );

  return (
    <div className="doneCard">
      <img
        className="doneImg"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      {type === 'bebida' ? drinkInfo() : mealInfo()}
      <ShareButton id={ id } type={ type } index={ index } path />
      <p data-testid={ `${index}-horizontal-name` }>{`Nome: ${name}`}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Data: ${doneDate}`}</p>
      { tags.map((tag) => (
        <div
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ tag }
        >
          {tag}
        </div>)) }
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
};
