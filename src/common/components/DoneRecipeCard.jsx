import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipeCard({ recipe, index }) { // Desestruturação de props
  const {
    // id,
    // type,
    area,
    category,
    // alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  return (
    <div className="doneCard">
      <img
        className="doneImg"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p className="doneArea">{`Area: ${area}`}</p>
      <p
        className="doneCategory"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`Categoria: ${category}`}
      </p>
      <input type="image" src={ shareIcon } alt="share icon" />
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
