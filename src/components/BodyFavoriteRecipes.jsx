import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { copyEachLink } from '../services/functions';

import shareIcon from '../images/shareIcon.svg';

export default function BodyFavoriteRecipes({ index, history, each }) {
  const [isCopied, setIsCopied] = useState([]);
  let AlcoholicAreaCategory;
  if (each.alcoholicOrNot.length > 0) {
    AlcoholicAreaCategory = each.alcoholicOrNot;
  } else {
    AlcoholicAreaCategory = `${each.area} - ${each.category}`;
  }
  const templateString = `/${each.type}s/${each.id}`;
  return (
    <section>
      <button
        type="button"
        onClick={ () => history.push(templateString) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="horizontal"
          src={ each.image }
          width="200px"
        />
      </button>
      <h1
        data-testid={ `${index}-horizontal-top-text` }
      >
        {AlcoholicAreaCategory}
      </h1>
      <button
        data-testid={ `${index}-horizontal-name` }
        type="button"
        onClick={ () => history.push(templateString) }
      >
        {each.name}
      </button>
      <button
        type="button"
        onClick={ () => setIsCopied(
          copyEachLink(templateString, index),
        ) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />
        {isCopied[index] ? <p>Link copiado!</p> : null }
      </button>
    </section>);
}

BodyFavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
  each: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
