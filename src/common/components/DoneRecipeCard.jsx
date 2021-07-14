import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
// comentário somente pra fazer um push que vai ajustar erros de Git.

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
    <div
      className="done-category"
      data-testid={ `${index}-horizontal-top-text` }
    >
      {`${area} - ${category}`}
    </div>
  );

  const drinkInfo = () => (
    <div
      className="done-category"
      data-testid={ `${index}-horizontal-top-text` }
    >
      {`${alcoholicOrNot}`}
    </div>
  );

  return (
    <div className="done-card">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="doneImg"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <div className="done-card-text">
          {type === 'bebida' ? drinkInfo() : mealInfo()}
          <div
            className="done-name"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </div>
          <div data-testid={ `${index}-horizontal-done-date` }>{doneDate}</div>
          <section className="tags">
            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </div>)) }
          </section>
        </div>
      </Link>
      <ShareButton className="share-done" id={ id } type={ type } index={ index } path />
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
};
