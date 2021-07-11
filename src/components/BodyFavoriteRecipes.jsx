import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { verifyFavorite } from '../services/manageLocalStorage';
import { settingFavorite2 } from '../services/manageLocalStorage2';
import { copyEachLink } from '../services/functions';

import shareIcon from '../images/shareIcon.svg';

export default function BodyFavoriteRecipes({ index, history, each }) {
  const [isCopied, setIsCopied] = useState([]);
  const [refresh, setRefresh] = useState(true);
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
      <button
        type="button"
        onClick={ () => setRefresh(settingFavorite2(each, each.id, refresh)) }
      >
        <img
          alt="Favorite"
          src={ verifyFavorite(each.id) }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </section>);
}

BodyFavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
  each: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
