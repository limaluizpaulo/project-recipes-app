import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function DoneRecipe({ recipe: {
  id, type, area, category, alcoholicOrNot, name, image, doneDate, tags }, index }) {
  const imgStyle = { width: '100%' };
  const [copiedLink, setCopiedLink] = useState(false);
  function shareBtn() {
    setCopiedLink(true);
    copy(`http://localhost:3000/${type}s/${id}`);
    const miliSeconds2Wait = 2000;
    setTimeout(() => { setCopiedLink(false); }, miliSeconds2Wait);
  }
  useEffect(() => {}, [copiedLink]);
  return (
    <div>
      <div>
        <Link to={ `/${type}s/${id}` }>
          <img
            src={ image }
            alt="recipe representation"
            data-testid={ `${index}-horizontal-image` }
            style={ imgStyle }
          />

        </Link>
      </div>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'comida' ? `${area} - ${category}`
              : `${alcoholicOrNot} - ${category}`
          }
        </p>
        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        {tags.map((tag, i) => (
          <p
            key={ i }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>))}
        <button type="button" onClick={ shareBtn }>

          {copiedLink
            ? <p data-testid={ `${index}-horizontal-share-btn` }>Link copiado!</p>
            : (
              <img
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />)}
        </button>
      </div>
    </div>
  );
}

DoneRecipe.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    doneDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoneRecipe;
